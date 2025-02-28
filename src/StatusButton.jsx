import { useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";

const StatusButton = ({status,onStatusChange }) => {
 

  return (
    <FormControl variant="outlined" size="small">
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{
          backgroundColor: "green",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
          "& .MuiSelect-icon": { color: "white" },
        }}
      >
        <MenuItem value="active">Активні</MenuItem>
        <MenuItem value="completed">Завершені</MenuItem>
        <MenuItem value="all">Усі</MenuItem>
      </Select>
    </FormControl>
  );
};
export default StatusButton;