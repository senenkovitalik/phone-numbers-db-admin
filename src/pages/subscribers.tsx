import {
  Datagrid,
  List,
  TextField,
  SimpleForm,
  TextInput,
  EditButton,
  Create,
  Show,
  SimpleShowLayout,
  ShowButton,
  SearchInput,
  ArrayField,
  SingleFieldList,
  Link,
  FunctionField,
  ReferenceArrayInput,
  SelectArrayInput,
  useEditController,
} from "react-admin";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import ListComponent from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Location } from "./types";

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
      <ArrayField source="locations" sortable={false}>
        <SingleFieldList linkType={false} component={ListComponent}>
          <FunctionField
            render={({ id, name }: Location) => {
              return (
                <ListItem disablePadding>
                  <Link to={`/locations/${id}/show`}>{name}</Link>
                </ListItem>
              );
            }}
          />
        </SingleFieldList>
      </ArrayField>
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
      <ArrayField source="locations">
        <SingleFieldList linkType={false} component={ListComponent}>
          <FunctionField
            render={({
              name,
              country,
              region,
              city,
              district,
              street,
              building,
              section,
              floor,
              room,
            }: Location) => {
              return (
                <ListItem disableGutters>
                  <span>
                    {name} {country && `${country}, `}
                    {region && `${region}, `}
                    {city && `${city}, `}
                    {district && `${district}, `}
                    {street && `${street}, `}
                    {building && `${building}, `}
                    {section && `${section}, `}
                    {floor && `${floor}, `}
                    {room && `${room}, `}
                  </span>
                </ListItem>
              );
            }}
          />
        </SingleFieldList>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export const SubscriberEdit = () => {
  const { id } = useParams();

  const { record, save, isLoading } = useEditController({
    resource: "subscribers",
    id,
  });

  if (isLoading) return null;

  const newrecord = Object.entries(record).reduce(
    (accumulator, currentValue) => {
      const [key, value] = currentValue;
      if (key === "locations") {
        return {
          ...accumulator,
          [key]: (value as Location[]).map(({ id }: Location) => id),
        };
      }
      return {
        ...accumulator,
        [key]: value,
      };
    },
    {}
  );

  return (
    <SimpleForm
      record={newrecord}
      onSubmit={save as SubmitHandler<FieldValues> | undefined}
    >
      <TextInput source="id" disabled />
      <TextInput source="firstName" />
      <TextInput source="middleName" />
      <TextInput source="lastName" />
      <ReferenceArrayInput source="locations" reference="locations">
        <SelectArrayInput />
      </ReferenceArrayInput>
    </SimpleForm>
  );
};

export const SubscriberCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="middleName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </Create>
);
