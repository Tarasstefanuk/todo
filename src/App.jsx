import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import StatusButton from "./StatusButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./task/task";
import "./App.css";

function App() {
 
  const [newtask, setNewtask] = useState("");
  const [task, setTask] = useState(() => {
    return JSON.parse(localStorage.getItem("hh")) || [];
  });
  const [status, setStatus] = useState("active");
  const rewrite = (news) => {
    localStorage.setItem("hh", JSON.stringify(news));
  };
  let taskfilter=[];
  const addTask = () => {
    if (!newtask.trim()) return;

    let localTask = JSON.parse(localStorage.getItem("hh")) || [];
    const newTaskObj = { id: uuidv4(), text: newtask,status:"active" };
    localTask.push(newTaskObj);
    setTask(localTask);
    localStorage.setItem("hh", JSON.stringify(localTask));
    setNewtask("");
  };

  const del = (index) => {
    let updatedTasks = [...task];
    updatedTasks.splice(index, 1);

    setTask(updatedTasks);
    localStorage.setItem("hh", JSON.stringify(updatedTasks));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(task);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTask(items);
    localStorage.setItem("hh", JSON.stringify(items));
  };

  return (
    <>
      <h1>TO-DO list</h1>

      <Box width={800} gap={15} m={1}>
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ gap: "15px" }}>
          <TextField value={newtask} onChange={(e) => setNewtask(e.target.value)} label="Нове завдання" variant="outlined" />
          <Button variant="contained" onClick={addTask} color="error">
            add task
          </Button>
          <StatusButton status={status} onStatusChange={setStatus}/>
        </Grid>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps} className="task-list">
              
              {
           
              task.filter((item) => status === "all" || item.status === status).map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Task rewrite={rewrite} del={del} kys={index} key={index} task={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
