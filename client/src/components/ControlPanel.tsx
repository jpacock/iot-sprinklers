import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { find, get } from 'lodash';

import { getConfig } from '../config'
import { getZoneDurationByUnit } from '../util/getZoneDurationByUnit';
import './ControlPanel.scss';

const { sprinklerServiceUrl } = getConfig();

export default function ControlPanel() {
  const [latestRunId, setLatestRunId] = useState('');
  const [startDisabled, setStartDisabled] = useState(false)
  const [unit, setUnit] = useState('inches');
  const [zones, _setZones] = useState(
    ['1','2','3','4'].map(zoneNumber => ({
      id: zoneNumber,
      name: `Zone ${zoneNumber}`,
      running: false,
      measurement: 0,
    })),
  );

  const setZones = (updatedZones: any) => {
    _setZones(updatedZones);
    zonesRef.current = updatedZones;
    if (updatedZones.some((zone: any) => zone.running === true)) {
      setStartDisabled(true);
    } else {
      setStartDisabled(false);
    }
  }

  const zonesRef = useRef(zones);

  useEffect(() => {
    const updateZonesStatus = (data: any) => {
      const parsedData = JSON.parse(data);
      const updatedZones = zonesRef.current.map(zone => {
        const zoneInResponse = find(parsedData.pinState, ['zone', zone.id]);
        const running = !zoneInResponse.state;
        return {
          ...zone,
          running,
        }
      })
      const latestRun = get(parsedData, 'latestRun', {});
      setLatestRunId(get(latestRun, 'id', ''));
      setZones(updatedZones);
    }

    const eventSource = new EventSource(`${sprinklerServiceUrl}/status`);
    eventSource.onmessage = (e) => updateZonesStatus(e.data);
    
    return () => {
      eventSource.close();
    };
  }, []);
  
  const handleUpdateMeasurement = (e: any) => {
    const updatedZones = zones.map((zone) => {
      if (zone.id === e.target.id) {
        return { ...zone, measurement: e.target.value }
      }
      return zone;
    });
    setZones(updatedZones);
  }

  const handleUnitChange = (event: any, newUnit: any) => {
    const updatedZones = zones.map((zone) => {
      return {...zone, measurement: 0}
    });
    setZones(updatedZones);
    setUnit(newUnit);
  };

  async function start() {
    const req = zones
      .filter(zone => zone.measurement > 0)
      .map(zone => ({ zone: zone.id, duration: getZoneDurationByUnit(zone.id, zone.measurement, unit)}));
    setStartDisabled(true);
    await axios.post(`${sprinklerServiceUrl}/runs/start`, req);
  }

  async function stop() {
    const url = `${sprinklerServiceUrl}/runs/stop`;
    await axios.post(url, null, {
      params: {
        runId: latestRunId,
      },
    });
    setStartDisabled(false);
  } 

  return (
    <div className="control-panel__container">
      <div className="control-panel__header"> 
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Control Panel</Typography>
      </div>
      <ToggleButtonGroup
        className="control-panel__unit-toggle"
        color="primary"
        value={unit}
        exclusive
        onChange={handleUnitChange}
      >
        <ToggleButton value="inches">Inches</ToggleButton>
        <ToggleButton value="minutes">Minutes</ToggleButton>
        <ToggleButton value="seconds">Seconds</ToggleButton>
      </ToggleButtonGroup>
      {zones.map(zone => (
        <div className="control-panel__item" key={zone.id}>
            {zone.name} 
            <span className="control-panel__running-label">{zone.running ? '(Running...)' : ''}</span>
            
          <div className="spacer" />
          <TextField
            id={zone.id}
            className="control-panel__item__input"
            error={isNaN(zone.measurement)}
            helperText={isNaN(zone.measurement) ? 'Must be number.' : ''}
            InputProps={{ 
              endAdornment: <InputAdornment className="control-panel__item__input__unit" position="start">{unit}</InputAdornment>,
              inputProps: {
                style: { textAlign: 'right' },
              }
            }}
            value={zone.measurement}
            onChange={(e) => handleUpdateMeasurement(e)}         
          ></TextField>
        </div>
      ))}
      <ButtonGroup className="control-panel__actions">
        <Button disabled={startDisabled} onClick={() => start()} color="primary" variant="contained">Start</Button>
        <Button color="primary" disabled={!startDisabled} onClick={() => stop()} variant="contained">Stop</Button>
      </ButtonGroup>
    </div>
  );
}
