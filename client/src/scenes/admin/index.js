import React, { useState } from "react";
import { Box, useTheme, Button, TextField, Typography } from "@mui/material";
import { useGetUsersQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Dropzone from "react-dropzone";
import { EditOutlined as EditOutlinedIcon } from "@mui/icons-material";
import PageHeader from "components/PageHeader";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: null,
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [deleteUserId, setDeleteUserId] = useState("");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleDeleteChange = (e) => {
    setDeleteUserId(e.target.value);
  };

  const handleFormSubmit = async () => {
    console.log("Form submitted:", formValues);
    const formData = new FormData();
    console.log(formValues["email"]);
    for (let value in formValues) {
      formData.append(value, formValues[value]);
    }
    formData.append("picturePath", formValues.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:5001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();

    // After submission, hide the form and reset values
    setIsFormVisible(false);
    setFormValues({
      firstName: "",
      lastName: "",
      location: "",
      occupation: "",
      picture: null,
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  const handleDeleteSubmit = async () => {
    console.log("Delete user with ID:", deleteUserId);

    const response = await fetch(
      `http://localhost:5001/auth/deleteUser/${deleteUserId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("User deleted successfully");
    } else {
      console.error("Failed to delete user");
    }

    setIsDeleteFormVisible(false);
    setDeleteUserId("");
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setIsDeleteFormVisible(false);
    setFormValues({
      firstName: "",
      lastName: "",
      location: "",
      occupation: "",
      picture: null,
      phoneNumber: "",
      email: "",
      password: "",
    });
    setDeleteUserId("");
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 0.5 },
    { field: "lastName", headerName: "Last Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "location", headerName: "Location", flex: 0.5 },
    { field: "occupation", headerName: "Occupation", flex: 0.5 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 0.5 },
  ];

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="USERS DETAILS"
        subtitle="List Of Users & Their Details"
      />
      {isFormVisible ? (
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ display: "grid", gap: "1rem" }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Location"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Occupation"
            name="occupation"
            value={formValues.occupation}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />
          <Box
            gridColumn="span 4"
            border={`1px solid ${theme.palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                setFormValues({ ...formValues, picture: acceptedFiles[0] })
              }
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.primary.light}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!formValues.picture ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{formValues.picture.name}</Typography>
                      <EditOutlinedIcon />
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />
          <Button
            onClick={handleFormSubmit}
            sx={{
              width: "47%",
              m: "2rem 0",
              p: "1rem",
              ml: "2rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            SUBMIT
          </Button>
          <Button
            onClick={handleCancel}
            sx={{
              width: "47%",
              m: "2rem 0",
              p: "1rem",
              ml: "1rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            CANCEL
          </Button>
        </Box>
      ) : (
        <>
          <Button
            onClick={() => {
              setIsFormVisible(true);
              setIsDeleteFormVisible(false);
            }}
            sx={{
              width: "47%",
              m: "2rem 0",
              p: "1rem",
              ml: "2rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            ADD
          </Button>
          <Button
            onClick={() => {
              setIsDeleteFormVisible(true);
              setIsFormVisible(false);
            }}
            type="submit"
            sx={{
              width: "47%",
              m: "2rem 0",
              p: "1rem",
              ml: "1rem",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary.main,
              },
            }}
          >
            DELETE
          </Button>
          {isDeleteFormVisible && (
            <Box>
              <Box
                component="form"
                onSubmit={handleDeleteSubmit}
                sx={{
                  display: "grid",
                }}
              >
                <Typography>UserID</Typography>
                <TextField
                  label="UserID"
                  name="userId"
                  value={deleteUserId}
                  onChange={handleDeleteChange}
                />
              </Box>
              <Button
                onClick={handleDeleteSubmit}
                sx={{
                  width: "47%",
                  m: "2rem 0",
                  p: "1rem",
                  ml: "1rem",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.background.alt,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                PROCEED WITH DELETING
              </Button>
              <Button
                onClick={handleCancel}
                sx={{
                  width: "47%",
                  m: "2rem 0",
                  p: "1rem",
                  ml: "1rem",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.background.alt,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                CANCEL
              </Button>
            </Box>
          )}
          <Box
            mt="40px"
            height="75vph"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-root": { borderBottom: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.palette,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={data || []}
              columns={columns}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Admin;
