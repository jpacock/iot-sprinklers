import { Container, Fab } from "@mui/material"; 
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { omit } from 'lodash';
import React, { useEffect, useState } from 'react';

import { IProgram } from '@iot-sprinklers/types';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import { getConfig } from '../../config/get-config';
import './Schedule.scss';
import ScheduleItemEditor from "../../components/ScheduleItemEditor/ScheduleItemEditor";

const { sprinklerServiceUrl } = getConfig();

export default function Schedule() {
  const [list, setList]: any[] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${sprinklerServiceUrl}/program`)
      setList(response.data);
    }
    fetchData();
  }, []);

  const updateProgram = async (updatedProgram: IProgram) => {
    const result = await axios.put(`${sprinklerServiceUrl}/program/${updatedProgram.id}`, updatedProgram); 
    if (result.status === 200) {
      setList((prevState: IProgram[]) => prevState.map((program) => {
        if (program.id === updatedProgram.id) return updatedProgram;
        return program;
      }));
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

  const handleDeleteProgram = async (id: string) => {
    const result = await axios.delete(`${sprinklerServiceUrl}/program/${id}`);
    if (result.status === 204) {
      setList((prevState: IProgram[]) => (prevState.filter(program => program.id !== id)));
    }
  };

  return (
    <>
      <Container className="schedule__container">
        { list.map((program: IProgram) => <ScheduleItem key={program.id} program={program} deleteProgram={handleDeleteProgram} updateProgram={updateProgram}/>)}
        <Fab color="primary" aria-label="add" sx={{alignSelf: 'center', mt: 5 }} onClick={() => setEditorOpen(true)}>
          <AddIcon />
        </Fab>
      </Container>
      <ScheduleItemEditor open={editorOpen} closeDialog={handleClose} saveProgram={handleAddProgram}/>
    </>
  );
}