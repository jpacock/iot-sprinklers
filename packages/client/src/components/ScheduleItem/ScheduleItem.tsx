import React from 'react';
import { Card, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import type { IProgram } from '@iot-sprinklers/types';
import './ScheduleItem.scss';
import ScheduleItemEditor from '../ScheduleItemEditor/ScheduleItemEditor';


interface Props {
  program: IProgram,
  updateProgram: (program: IProgram) => void,
  deleteProgram: (id: string) => void,
}

export default function ScheduleItem({program, deleteProgram, updateProgram}: Props) {
  const [editorOpen, setEditorOpen] = React.useState(false);

  const handleClickOpen = () => { setEditorOpen(true); };

  const handleClose = () => { setEditorOpen(false); };

  const handleEditorSave = (program: IProgram) => updateProgram(program);

  const handleSwitch = () => updateProgram({ ...program, active: !program.active });
  
  return (
    <>
      <Card className="schedule-item">
        <DialogTitle id="alert-dialog-title" sx={{ flexGrow: 1 }}>
            {program.displayName}
        </DialogTitle>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClickOpen}>
          Edit
        </Button>
        <Switch checked={program.active} onChange={handleSwitch}></Switch>
      </Card>
      <ScheduleItemEditor 
        program={program} 
        open={editorOpen}
        closeDialog={handleClose}
        deleteProgram={deleteProgram}
        saveProgram={handleEditorSave}
      />
    </>
  );
}