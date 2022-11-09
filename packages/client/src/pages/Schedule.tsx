import { Container, Fab, IconButton, Snackbar } from "@mui/material"; 
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { omit } from 'lodash';
import React, { useEffect, useState } from 'react';

import { IProgram } from '../../../shared/build';
import { AddScheduleItemOverlay } from "../components/AddScheduleItemOverlay/AddScheduleItemOverlay";
import ScheduleItem from '../components/ScheduleItem/ScheduleItem';
import ScheduleItemEditor from "../components/ScheduleItemEditor/ScheduleItemEditor";
import { getConfig } from '../config/get-config';

const { sprinklerServiceUrl } = getConfig();

export const Schedule = () => {
  const [list, setList]: any[] = useState([]);
  const [addScheduleItemOverlayOpen, setAddScheduleItemOverlayOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${sprinklerServiceUrl}/program`);
      const programs = response.data as IProgram[];
      programs.sort((a, b) => a.displayName > b.displayName ? 1 : -1);
      setList(programs);
    }
    fetchData();
  }, []);

  const updateProgram = async (updatedProgram: IProgram) => {

    try {
      const result = await axios.put(`${sprinklerServiceUrl}/program/${updatedProgram.id}`, updatedProgram); 
      
      if (result.status === 200) {
        setList((prevState: IProgram[]) => prevState.map((program) => {
          if (program.id === updatedProgram.id) return updatedProgram;
          return program;
        }));
      }
    } catch(err) {
      setErrorMessage('Error updating program.')
      setNotificationOpen(true);
    }
  };

  const handleAddProgram = async (program: IProgram) => {
    const result = await axios.post(`${sprinklerServiceUrl}/program`, omit(program, 'id'));
    const { id } = result.data;
    if (result.status === 201) {
      setList((prevState: IProgram[]) => ([
        ...prevState,
        {
          ...program,
          id,
        }
      ]));
    }
  };

  const handleClose = () => {
    setEditorOpen(false);
  };

  const handleCloseNotification = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(false);
  };

  const handleDeleteProgram = async (id: string) => {
    const result = await axios.delete(`${sprinklerServiceUrl}/program/${id}`);
    if (result.status === 204) {
      setList((prevState: IProgram[]) => (prevState.filter(program => program.id !== id)));
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseNotification}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Container className="schedule__container" >
        { list.map((program: IProgram) => <ScheduleItem key={program.id} program={program} deleteProgram={handleDeleteProgram} updateProgram={updateProgram}/>)}
        <Snackbar
          open={notificationOpen}
          autoHideDuration={6000}
          message={errorMessage}
          action={action}
        />
        {/* <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={() => setEditorOpen(true)}>
          <AddIcon />
        </Fab> */}
        <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={() => setAddScheduleItemOverlayOpen(true)}>
          <AddIcon />
        </Fab>
      </Container>
      <ScheduleItemEditor open={editorOpen} closeDialog={handleClose} saveProgram={handleAddProgram}/>
      <AddScheduleItemOverlay onClose={(value: string) => { setAddScheduleItemOverlayOpen(false); setSelectedValue(value)}} open={addScheduleItemOverlayOpen} selectedValue={selectedValue}/>
    </>
  );
}