import './task.css'
import { useState } from 'react';

import DeleteIcon from "@mui/icons-material/Delete";

import { ListItem, ListItemText, IconButton, Checkbox, Paper } from "@mui/material";


const Task = ({ task, kys, del }) => {

  const [status, setStatus] = useState(false);

  return (
    <Paper elevation={3} sx={{ padding: 1, marginBottom: 1, display: "flex", alignItems: "center" }}>
      <Checkbox checked={status} onChange={() => setStatus(!status)} color="success" />
      <ListItemText primary={task.text} sx={{ textDecoration: status ? "line-through" : "none" }} />
      <IconButton color="error" onClick={() => del(kys)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default Task;
