import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  data,
  isEdit,
  setIsEdit,
  setOpen,
  open,
  handleClose,
}) {
  const initialState = {
    fname: "",
    lname: "",
    mobile: "",
  };
  const [inputData, setInputData] = React.useState(
    isEdit ? data : initialState
  );

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    // setIsAdd(false);
    setOpen(false);
    const { fname, lname, mobile } = inputData;
    axios
      .post("http://localhost:5000/table/add", {
        fname,
        lname,
        mobile,
      })
      .then((res) => {
        console.log(res);
        if (res?.status == 201) {
          alert("Data added successfully");
        } else {
          alert("Something went wrong");
        }
      });
  };
  console.log(inputData);
  const handleUpdate = () => {
    const { fname, lname, mobile } = inputData;

    axios
      .put(`http://localhost:5000/table/${inputData?._id}`, {
        fname,
        lname,
        mobile,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
      });
    setOpen(false);
  };
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Form To Add Data
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                onChange={HandleChange}
                value={inputData?.fname}
                label="First Name"
                name="fname"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                onChange={HandleChange}
                value={inputData?.lname}
                label="Last Name"
                name="lname"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                onChange={HandleChange}
                value={inputData?.mobile}
                label="Mobile"
                name="mobile"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {isEdit ? (
            <Button autoFocus onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button autoFocus onClick={handleSubmit}>
              Add
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
