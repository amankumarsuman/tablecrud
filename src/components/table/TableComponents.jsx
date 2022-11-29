import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import CustomizedDialogs from "./DialogueBox";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableComponent() {
  const [data, setData] = React.useState([]);
  const [isDelete, setIsDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [individualData, setIndividualData] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };
  function getDataFromApi() {
    axios.get("http://localhost:5000/table").then((res) => setData(res.data));
  }
  useEffect(() => {
    getDataFromApi();
  }, [open, isDelete]);

  const handleAddBtn = () => {
    setOpen(true);
  };

  //function to delete the particular record

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/table/${id}`).then((res) => {
      console.log(res);
      if (res?.status == 200) {
        alert("Data deleted successfully");
      } else {
        alert("Something went wrong");
      }
    });
    setIsDelete(!isDelete);
  };
  const handleEdit = (record) => {
    setOpen(true);
    setIsEdit(true);
    setIndividualData(record);
  };
  return (
    <>
      <TableContainer
        sx={{ width: "80%", margin: "auto", marginTop: "2em" }}
        component={Paper}
      >
        <Table aria-label="customized table">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              padding: "1em",
            }}
          >
            <Button onClick={handleAddBtn} variant="contained">
              Add
            </Button>
          </div>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>

              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.fname}
                </StyledTableCell>
                <StyledTableCell align="right">{row.lname}</StyledTableCell>
                <StyledTableCell align="right">{row.mobile}</StyledTableCell>

                <StyledTableCell align="right">
                  <EditIcon onClick={() => handleEdit(row)} />
                  <DeleteIcon onClick={() => handleDelete(row?._id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open ? (
        <CustomizedDialogs
          data={individualData}
          open={open}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
}
