import {
  Datagrid,
  List,
  TextField,
  SimpleForm,
  TextInput,
  EditButton,
  DeleteButton,
  Create,
  Edit,
  WithRecord,
} from "react-admin";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { required } from "ra-core";

export const LocationList = () => (
  <>
    <Box sx={{ pt: 1 }}>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        You are be able to create and update only parent locations. If you need
        to manipulate child locations - do this through subscriber edit page.
      </Alert>
    </Box>
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="parentId" />
        <TextField source="description" />
        <TextField source="country" />
        <TextField source="region" />
        <TextField source="district" />
        <TextField source="city" />
        <TextField source="street" />
        <TextField source="building" />
        <TextField source="section" />
        <TextField source="floor" />
        <TextField source="room" />
        <WithRecord
          render={(record) =>
            record.parentId === null ? <EditButton /> : <></>
          }
        />
        <WithRecord
          render={(record) =>
            record.parentId === null ? <DeleteButton /> : <></>
          }
        />
      </Datagrid>
    </List>
  </>
);

export const LocationEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="description" />
      <TextInput source="country" />
      <TextInput source="region" />
      <TextInput source="district" />
      <TextInput source="city" />
      <TextInput source="street" />
      <TextInput source="building" />
      <TextInput source="section" />
      <TextInput source="floor" />
      <TextInput source="room" />
    </SimpleForm>
  </Edit>
);

export const LocationCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="description" />
      <TextInput source="country" />
      <TextInput source="region" />
      <TextInput source="district" />
      <TextInput source="city" />
      <TextInput source="street" />
      <TextInput source="building" />
      <TextInput source="section" />
      <TextInput source="floor" />
      <TextInput source="room" />
    </SimpleForm>
  </Create>
);
