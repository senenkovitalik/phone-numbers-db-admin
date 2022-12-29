import { Datagrid, DateField, EditButton, List, TextField } from "react-admin";

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
