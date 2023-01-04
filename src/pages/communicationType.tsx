import {
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  Show,
  SimpleShowLayout,
} from "react-admin";

export const CommunicationTypeList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" />
      <DateField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CommunicationTypeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="value" />
      <DateField source="description" />
    </SimpleShowLayout>
  </Show>
);
