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
  SearchInput,
  FunctionField,
  Link,
} from "react-admin";
import { CommunicationPhoneNumber } from "./types";

const communicationPhoneNumberFilters = [
  <SearchInput source="q" alwaysOn />,
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
      <TextField source="id" label="ID" />

      <TextField source="value" label="Phone Number" />

      <FunctionField
        label="Communication Type"
        render={({
          communicationType: { id, value },
        }: CommunicationPhoneNumber) => {
          return <Link to={`/communication_types/${id}/show`}>{value}</Link>;
        }}
      />

      <FunctionField
        label="Location"
        render={({ location: { id, name } }: CommunicationPhoneNumber) => {
          return <Link to={`/locations/${id}/show`}>{name}</Link>;
        }}
      />

      <FunctionField
        label="Subscriber"
        render={({
          subscriber: { id, firstName, middleName, lastName },
        }: CommunicationPhoneNumber) => {
          return (
            <Link to={`/subscribers/${id}/show`}>
              <FullNameField />
            </Link>
          );
        }}
      />

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
  const { subscriber } = useRecordContext();
  return (
    <span>
      {subscriber.firstName} {subscriber.middleName} {subscriber.lastName}
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
