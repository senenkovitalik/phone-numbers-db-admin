import { Datagrid, List, TextField } from "react-admin";

export const HumanList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="middleName" />
      <TextField source="lastName" />
    </Datagrid>
  </List>
);
