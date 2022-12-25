import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
} from "react-admin";

export const SubscriberList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="middleName" />
      <TextField source="lastName" />
    </Datagrid>
  </List>
);

export const SubscriberEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="firstName" />
      <TextInput source="middleName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </Edit>
);
