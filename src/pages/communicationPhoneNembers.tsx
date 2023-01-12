import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  TextField,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  SelectInput,
  useRecordContext,
} from "react-admin";

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

      <ReferenceField source="locationId" reference="locations" link="show">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField source="subscriberId" reference="subscribers" link="show">
        <FullNameField />
      </ReferenceField>

      <EditButton />
    </Datagrid>
  </List>
);

const FullNameField = () => {
  const record = useRecordContext();
  return (
    <span>
      {record.firstName} {record.middleName} {record.lastName}
    </span>
  );
};

export const CommunicationPhoneNumberEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="value" />
        <ReferenceInput
          source="communicationTypeId"
          reference="communication_types"
        >
          <SelectInput optionText={"value"} />
        </ReferenceInput>
        <ReferenceInput source="locationId" reference="locations">
          <SelectInput optionText={"name"} />
        </ReferenceInput>
        <ReferenceInput source="subscriberId" reference="subscribers">
          <SelectInput optionText={<FullNameField />} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
