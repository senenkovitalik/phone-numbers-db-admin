import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
  Create,
} from "react-admin";

export const SubscriberList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="middleName" />
      <TextField source="lastName" />
      <EditButton />
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

export const SubscriberCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="middleName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </Create>
);
