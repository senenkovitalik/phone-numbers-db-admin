import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
  Create,
  Show,
  SimpleShowLayout,
  ShowButton,
  SearchInput,
} from "react-admin";

const subscriberFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="First Name" source="firstName" />,
  <TextInput label="Middle Name" source="middleName" />,
  <TextInput label="Last Name" source="lastName" />,
];

export const SubscriberList = () => (
  <List filters={subscriberFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="middleName" />
      <TextField source="lastName" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export const SubscriberShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="middleName" />
      <TextField source="lastName" />
    </SimpleShowLayout>
  </Show>
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
