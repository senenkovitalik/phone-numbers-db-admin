import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export const CommunicationPhoneNumberList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" />
      <ReferenceField
        source="communicationTypeId"
        reference="communication_types"
        link="show"
      >
        <TextField source="value" />
      </ReferenceField>
      {/* <ReferenceField source="locationId" reference="locations" /> */}
    </Datagrid>
  </List>
);
