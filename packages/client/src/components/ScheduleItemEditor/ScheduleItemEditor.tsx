import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { IProgram, RunTimeUnitType } from '../../../../shared';
import './ScheduleItemEditor.scss';
import { getZoneDurationByUnit } from '../../util/getZoneDurationByUnit';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean,
  program?: IProgram,
  closeDialog: () => void,
  deleteProgram?: (id: string) => void,
  saveProgram: (program: IProgram) => void,
}

export default function ScheduleItemEditor({ 
    open, 
    program = {
      id: '',
      active: false,
      displayName: '',
      startHours: 12,
      startMinutes: 0,
      startDaysOfWeek: '',
      runTimes: [{id: 'zone-1', zoneId: '1', measurement: 0}],
      runTimeUnit: RunTimeUnitType.Seconds,
    },
    closeDialog,
    deleteProgram,
    saveProgram,
}: Props) {
  const [days, setDays] = useState([] as string[]);
  const [displayName, setDisplayName] = useState('');
  const [time, setTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [runTimes, setRunTimes] = useState(program.runTimes.map(runTime => ({...runTime, measurement: runTime.measurement.toString()})));
  const [runTimeUnit, setRunTimeUnit] = useState(program.runTimeUnit);

  const initializeDialog = () => {
    if (deleteProgram) {
      setDays(program.startDaysOfWeek.split(','));
      setDisplayName(program.displayName);
      setTime(() => {
        const date = new Date();
        date.setHours(program.startHours);
        date.setMinutes(program.startMinutes);
        return date;
      })
      setRunTimes(program.runTimes.map(runTime => ({...runTime, measurement: runTime.measurement.toString()})));
    } else {
      setDays([]);
      setDisplayName('');
      setTime(new Date());
      setRunTimeUnit(RunTimeUnitType.Seconds);
    }
  }

  useEffect(() => {
    if (open) initializeDialog();
    // eslint-disable-next-line
  }, [open])

  useEffect(() => {
    let secondsToAdd = 0;
    runTimes.forEach((runTime) => {
      if (runTime.zoneId !== '') {
        const { zoneId, measurement } = runTime;
        secondsToAdd += getZoneDurationByUnit(zoneId, Number(measurement), runTimeUnit);
      }
    });

    setEndTime(moment(time).add(secondsToAdd, 's').toDate());
  }, [runTimes, runTimeUnit, time]); 


  let deleteButton;
  if (deleteProgram) {
    deleteButton = <Button color="error" variant="outlined" sx={{}} onClick={() => deleteProgram(program.id)}>Delete Program</Button>
  }

  const handleAddRunTime = () => {
    const newRunTimes = [
      ...runTimes,
      {
        id: `runtime-${runTimes.length}`,
        zoneId: '',
        measurement: '0',
      },
    ];
    setRunTimes(newRunTimes);
  };

  const handleChangeRuntimeMeasurement = (e: any, id: string) => {
    const newRunTimes = runTimes.map((r) => {
      if (r.id === id) return { ...r, measurement: e.target.value}
      return r;
    });
    setRunTimes(newRunTimes);
  };

  const handleChangeRuntimeZone = (e: any, id: string) => {
    const newRunTimes = runTimes.map((r) => {
      if (r.id === id) return { ...r, zoneId: e.target.value}
      return r;
    });
    setRunTimes(newRunTimes);
  };

  const handleDeleteRunTime = (id: string) => {
    const newRunTimes = runTimes.filter(r => r.id !== id);
    setRunTimes(newRunTimes);
  }

  const handleClose = async () => {
    closeDialog();
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const handleDays = (
    _: React.MouseEvent<HTMLElement>,
    updatedDays: string[],
  ) => {
    setDays(updatedDays);
  };

  const handleSave = () => {
    // const formattedsDaysOfWeek =
    saveProgram({
      ...program,
      displayName,
      startDaysOfWeek: days.join(),
      startHours: moment(time).hours(),
      startMinutes: moment(time).minutes(),
      runTimes: runTimes.map((runTime: any) => ({...runTime, measurement: Number(runTime.measurement) })),
      runTimeUnit,
    });
    closeDialog();
  }

  const handleTimeChange = (newValue: Date | null) => {
    setTime(newValue);

  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit {program.displayName}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave} disabled={isEmpty(displayName)}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{mt: 2}}>
          <Stack spacing={3}>
            <ToggleButtonGroup
              color="primary"
              value={days}
              onChange={handleDays}
              aria-label="outlined primary button group"
              sx={{alignSelf: 'center'}}
            >
              <ToggleButton value="0">SUN</ToggleButton>
              <ToggleButton value="1">MON</ToggleButton>
              <ToggleButton value="2">TUE</ToggleButton>
              <ToggleButton value="3">WED</ToggleButton>
              <ToggleButton value="4">THR</ToggleButton>
              <ToggleButton value="5">FRI</ToggleButton>
              <ToggleButton value="6">SAT</ToggleButton>
            </ToggleButtonGroup>
            <TextField 
              id="outlined-basic"
              label="Program Name"
              variant="outlined"
              error={isEmpty(displayName)}
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value)
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    label="Start Time"
                    value={time}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    disabled
                    label="End Time"
                    value={endTime}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <>
              <FormControl fullWidth>
                <ToggleButtonGroup
                  color="primary"
                  value={runTimeUnit}
                  exclusive
                  sx={{ alignSelf: 'center' }}
                  onChange={(e: any) => setRunTimeUnit(e.target.value)}
                >
                  <ToggleButton value="inches">Inches</ToggleButton>
                  <ToggleButton value="minutes">Minutes</ToggleButton>
                  <ToggleButton value="seconds">Seconds</ToggleButton>
                </ToggleButtonGroup>
                </FormControl>
                <List>
                {
                  runTimes.map((runTime: any) => (
                    <ListItem key={runTime.id}>
                      <Box sx={{flexGrow: 1}}>
                        <Box sx={{flexGrow: 1, maxWidth: 150 }}>
                          <FormControl fullWidth>
                            <Select
                              id="demo-simple-select"
                              value={runTime.zoneId}
                              onChange={(e) => handleChangeRuntimeZone(e, runTime.id)}
                            >
                              <MenuItem value={'1'}>Zone 1</MenuItem>
                              <MenuItem value={'2'}>Zone 2</MenuItem>
                              <MenuItem value={'3'}>Zone 3</MenuItem>
                              <MenuItem value={'4'}>Zone 4</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                      <TextField
                        className="control-panel__item__input"
                        error={isNaN(runTime.measurement)}
                        helperText={isNaN(runTime.measurement) ? 'Must be number.' : ''}
                        InputProps={{ 
                          endAdornment: <InputAdornment className="control-panel__item__input__unit" position="start">{runTimeUnit}</InputAdornment>,
                          inputProps: {
                            style: { textAlign: 'right' },
                          }
                        }}
                        sx={{ mr: 3 }}
                        value={runTime.measurement}
                        onChange={(e) => handleChangeRuntimeMeasurement(e, runTime.id)}         
                      />
                      <IconButton onClick={() => handleDeleteRunTime(runTime.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))
                }
              </List>
              <Fab color="primary" aria-label="add" sx={{alignSelf: 'flex-end', mt: 3 }} onClick={handleAddRunTime}>
                <AddIcon />
              </Fab>

              {deleteButton}
              <Box sx={{minHeight: 3}}></Box>
            </>
          </Stack>
        </Container>
      </Dialog>
    </>
  )
}
