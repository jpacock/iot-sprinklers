import { Box, Card, DialogTitle, List, ListItem, Switch, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { getConfig } from '../config/get-config';

const { sprinklerServiceUrl } = getConfig();

export const Manual = () => {
  const [zoneStatus, setZoneStatus] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${sprinklerServiceUrl}/status`);
      const status = response.data as any[];
      status.sort((a, b) => a.zone > b.zone ? 1 : -1);
      setZoneStatus(status);
    }

    fetchData();
  }, []);

  const handleZoneSwitch = async (id: string) => {
    const open = zoneStatus.find((zone: any) => zone.zone === id)!.open;
    const result = await axios.post(`${sprinklerServiceUrl}/manual/${id}/${open ? 'stop' : 'start'}`);
    if (result.status === 200) {
      setZoneStatus((prevState: any) => prevState.map((zone: any) => {
        if (zone.zone === id) return {...zone, open: !zone.open};
        return zone;
      }));
    }
  };

  return (
    <>
      <List>
        {zoneStatus.map((status: any) => 
          <ListItem key={status.zone}>
            <Card sx={{alignItems: 'center', display: 'flex', height: "130px", flexGrow: 1}}>
              <Typography sx={{ flexGrow: 1 }} variant="h6" p={[4]}>
                Zone {status.zone}
              </Typography>
              <Box p={2}>
                <Switch checked={status.open} onChange={() => handleZoneSwitch(status.zone)}></Switch>
              </Box>
            </Card>
          </ListItem>
        )}
      </List> 
    </>
  )
}
