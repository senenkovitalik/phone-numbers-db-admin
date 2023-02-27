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
  ReferenceInput,
  SelectInput,
  ListGuesser,
  useRecordContext,
  required,
  ArrayInput,
  NumberInput,
  SimpleFormIterator,
  useCreateController,
  useGetList,
  FormDataConsumer,
} from "react-admin";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import ListComponent from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Location, Human, GetListI, DisabledFields } from "./types";
import _ from "lodash";
import { getMapOfDisabledFields } from "../utils";

const subscriberFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="First Name" source="firstName" />,
  <TextInput label="Middle Name" source="middleName" />,
  <TextInput label="Last Name" source="lastName" />,
  <ReferenceInput label="Location" source="locations" reference="locations">
    <SelectInput optionText={({ name }: Location) => name} />
  </ReferenceInput>,
];

const FullNameField = () => {
  const { human }: { human: Human | null } = useRecordContext();

  if (human) {
    const { id, firstName, middleName, lastName } = human;

    return (
      <Link to={`/humans/${id}/show`}>
        {firstName} {middleName} {lastName}
      </Link>
    );
  }
  return null;
};

export const SubscriberList = () => (
  <List /*filters={subscriberFilters}*/>
    <Datagrid>
      <TextField source="id" />
      <TextField source="position" />
      <FullNameField />
      <TextField source="description" />

      {/* <ArrayField source="locations" sortable={false}>
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
      </ArrayField> */}
      {/* <EditButton /> */}
      {/* <ShowButton /> */}
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
      <TextInput source="firstName" required />
      <TextInput source="middleName" required />
      <TextInput source="lastName" required />
      <ReferenceArrayInput source="locations" reference="locations">
        <SelectArrayInput />
      </ReferenceArrayInput>
    </SimpleForm>
  );
};

export const SubscriberCreate = () => {
  const { save } = useCreateController({
    resource: "locations",
    transform: (data) => _.omit(data, "type"),
  });

  const { data, isLoading }: GetListI = useGetList("locations", {
    filter: { parentId: null },
  });

  if (isLoading) return null;

  const locations = data ? data : [];

  return (
    <SimpleForm onSubmit={save as SubmitHandler<FieldValues>}>
      <ReferenceInput source="human" reference="humans">
        <SelectInput
          optionText={(human: Human) =>
            `${human.firstName} ${human.middleName} ${human.lastName}`
          }
          validate={required()}
        />
      </ReferenceInput>

      <ArrayInput source="locations">
        <SimpleFormIterator>
          <SelectInput
            source="parentId"
            choices={locations}
            optionText="name"
            validate={required()}
          />
          <TextInput source="name" />
          <TextInput source="description" />
          <FormDataConsumer>
            {({ formData, scopedFormData, getSource }) => {
              const location = (locations as Location[]).find(
                ({ id }) => id === scopedFormData.parentId
              );

              const disabledFields: DisabledFields = location
                ? getMapOfDisabledFields(location)
                : {};

              const getFieldDefaultValue = (field: keyof Location) =>
                location ? location[field] : undefined;

              return (
                <>
                  <TextInput
                    source={(getSource && getSource("country")) as string}
                    disabled={disabledFields && disabledFields.country}
                    defaultValue={getFieldDefaultValue("country")}
                  />
                  <TextInput
                    source="region"
                    disabled={disabledFields && disabledFields.region}
                    defaultValue={getFieldDefaultValue("region")}
                  />
                  <TextInput
                    source="district"
                    disabled={disabledFields && disabledFields.district}
                    defaultValue={getFieldDefaultValue("district")}
                  />
                  <TextInput
                    source="city"
                    disabled={disabledFields && disabledFields.city}
                    defaultValue={getFieldDefaultValue("city")}
                  />
                  <TextInput
                    source="street"
                    disabled={disabledFields && disabledFields.street}
                    defaultValue={getFieldDefaultValue("street")}
                  />
                  <TextInput
                    source="building"
                    disabled={disabledFields && disabledFields.building}
                    defaultValue={getFieldDefaultValue("building")}
                  />
                  <TextInput
                    source="section"
                    disabled={disabledFields && disabledFields.section}
                    defaultValue={getFieldDefaultValue("section")}
                  />
                  <TextInput
                    source="floor"
                    disabled={disabledFields && disabledFields.floor}
                    defaultValue={getFieldDefaultValue("floor")}
                  />
                  <TextInput
                    source={(getSource && getSource("room")) as string}
                    disabled={disabledFields && disabledFields.room}
                    defaultValue={getFieldDefaultValue("room")}
                  />
                </>
              );
            }}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};
