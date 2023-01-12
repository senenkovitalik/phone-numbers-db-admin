import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
  Show,
  SimpleShowLayout,
} from "react-admin";

export const LocationList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
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
      <EditButton />
    </Datagrid>
  </List>
);

export const LocationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
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

export const LocationShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
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
    </SimpleShowLayout>
  </Show>
);
