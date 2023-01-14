import {
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  Show,
  SimpleShowLayout,
  TextInput,
  Create,
  Edit,
  SimpleForm,
  ShowButton,
} from "react-admin";

export const CommunicationTypeList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" />
      <TextField source="description" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export const CommunicationTypeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="value" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
);

export const CommunicationTypeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="value" required />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

export const CommunicationTypeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" required />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
