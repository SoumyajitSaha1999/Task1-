import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Load data from localStorage if available, otherwise use default rows
const initialRows = () => {
  const savedRows = localStorage.getItem("rows");
  return savedRows
    ? JSON.parse(savedRows)
    : [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
      ];
};

function DataTable() {
  const [rows, setRows] = useState(initialRows); // State to store all rows
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row for editing
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  // Handle the click on the edit icon
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditedData({
      firstName: row.firstName,
      lastName: row.lastName,
      age: row.age || "", // In case age is null
    });
    setOpen(true);
  };

  // Handle input change for each field in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setEditedData({ ...editedData, [name]: value });
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle saving the edited data
  const handleSave = () => {
    const updatedRows = rows.map((row) =>
      row.id === selectedRow.id ? { ...row, ...editedData } : row
    );
    setRows(updatedRows); // Update the rows with the new data
    localStorage.setItem("rows", JSON.stringify(updatedRows)); // Save updated data to localStorage
    setOpen(false); // Close the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog without saving
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={() => handleEditClick(params.row)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />

      {/* Modal (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Row Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <TextField
                margin="dense"
                label="First Name"
                name="firstName"
                value={editedData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Last Name"
                name="lastName"
                value={editedData.lastName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Age"
                name="age"
                value={editedData.age}
                onChange={handleInputChange}
                type="number"
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default DataTable;
