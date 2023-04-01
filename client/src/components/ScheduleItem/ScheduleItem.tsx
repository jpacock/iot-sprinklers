import { Card, DialogTitle, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import React from 'react';
import { IProgram } from 'shared/types';


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
        <Typography id="alert-dialog-title" p={1} sx={{ flexGrow: 1 }} variant="h6">
            {program.displayName.substring(0,15)}
        </Typography>
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