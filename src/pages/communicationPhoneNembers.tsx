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
  Create,
  ShowButton,
  Show,
  SimpleShowLayout,
  AutocompleteInput,
} from "react-admin";

const communicationPhoneNumberFilters = [
  <TextInput label="Value" source="value" />,
  <ReferenceInput
    label="Communication Type"
    source="communicationTypeId"
    reference="communication_types"
  >
    <AutocompleteInput optionText="value" />
  </ReferenceInput>,
  <ReferenceInput label="Location" source="locationId" reference="locations">
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
  <TextInput label="Subscriber" source="subscriber" />,
];

export const CommunicationPhoneNumberList = () => (
  <List filters={communicationPhoneNumberFilters}>
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
      <ShowButton />
    </Datagrid>
  </List>
);

export const CommunicationPhoneNumberShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />

      <TextField source="value" />

      <ReferenceField
        source="communicationTypeId"
        reference="communication_types"
      >
        <TextField source="value" />
      </ReferenceField>

      <ReferenceField source="locationId" reference="locations" link="show">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField source="subscriberId" reference="subscribers" link="show">
        <FullNameField />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
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

export const CommunicationPhoneNumberCreate = () => (
  <Create redirect="list">
    <SimpleForm>
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
  </Create>
);
