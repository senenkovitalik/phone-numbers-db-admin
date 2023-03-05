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
  // <SearchInput source="q" alwaysOn />,
  // <TextInput label="First Name" source="firstName" />,
  // <TextInput label="Middle Name" source="middleName" />,
  // <TextInput label="Last Name" source="lastName" />,
  <ReferenceArrayInput
    label="Location"
    source="locations"
    reference="locations"
  >
    <SelectArrayInput optionText={({ name }: Location) => name} />
  </ReferenceArrayInput>,
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
  <List filters={subscriberFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="position" />
      <FullNameField />
      <TextField source="description" />

      <ArrayField source="locations" sortable={false}>
        <SingleFieldList linkType={false} component={ListComponent}>
          <FunctionField
            render={({
              id,
              name,
              country,
              region,
              district,
              city,
              street,
              building,
              section,
              floor,
              room,
              description,
              parentId,
            }: Location) => {
              return (
                <ListItem disablePadding>
                  <Link to={`/locations/${id}/show`}>
                    id: {id} {name} {country} {region} {district} {city}{" "}
                    {street} {building} {section} {floor} {room}
                    {parentId && `parentId: ${parentId}`}
                    {description && `(description: ${description})`}
                  </Link>
                </ListItem>
              );
            }}
          />
        </SingleFieldList>
      </ArrayField>
      <EditButton />
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

  const {
    record,
    save,
    isLoading: isLoadingSubscriber,
  } = useEditController({
    resource: "subscribers",
    id,
  });

  const { data, isLoading: isLoadingLocations }: GetListI = useGetList(
    "locations",
    {
      filter: { parentId: null },
    }
  );

  if (isLoadingLocations || isLoadingSubscriber) return null;

  const newrecord = Object.entries(record).reduce(
    (accumulator, currentValue) => {
      const [key, value] = currentValue;
      if (key === "locations" && Array.isArray(value) && value.length >= 1) {
        return {
          ...accumulator,
          [key]: (value as Location[]).map(({ id }: Location) => id),
        };
      }
      if (key === "human") {
        return {
          ...accumulator,
          humanId: (value as Human).id,
        };
      }
      return {
        ...accumulator,
        [key]: value,
      };
    },
    {}
  );

  const locations = data ? data : [];

  return (
    <SimpleForm
      record={newrecord}
      onSubmit={save as SubmitHandler<FieldValues> | undefined}
    >
      <TextInput source="position" />
      <TextInput source="description" />
      <ReferenceInput
        source="humanId"
        reference="humans"
        filter={{ subscriber: { id: parseInt(id as string) } }}
        sort={{ field: "firstName", order: "ASC" }}
      >
        {/* replace by AutocompleteInput */}
        <SelectInput
          optionText={({ firstName, middleName, lastName }: Human) =>
            `${firstName} ${middleName} ${lastName}`
          }
        />
      </ReferenceInput>

      <ArrayInput source="locations">
        <SimpleFormIterator disableReordering>
          <SelectInput
            source="parentId"
            choices={locations}
            optionText="name"
            validate={required()}
          />

          <TextInput source="name" />
          <TextInput source="description" />

          <FormDataConsumer>
            {({ scopedFormData, getSource }) => {
              const location = (locations as Location[]).find(
                ({ id }) => id === scopedFormData.parentId
              );

              const disabledFields: DisabledFields = location
                ? getMapOfDisabledFields(location)
                : {};

              const getFieldDefaultValue = (field: keyof Location) =>
                location ? location[field] : undefined;

              const getSourceValue = (field: keyof Location): string =>
                (getSource && getSource(field)) as string;

              return (
                <>
                  <TextInput
                    source={getSourceValue("country")}
                    disabled={disabledFields && disabledFields.country}
                    defaultValue={getFieldDefaultValue("country")}
                  />
                  <TextInput
                    source={getSourceValue("region")}
                    disabled={disabledFields && disabledFields.region}
                    defaultValue={getFieldDefaultValue("region")}
                  />
                  <TextInput
                    source={getSourceValue("district")}
                    disabled={disabledFields && disabledFields.district}
                    defaultValue={getFieldDefaultValue("district")}
                  />
                  <TextInput
                    source={getSourceValue("city")}
                    disabled={disabledFields && disabledFields.city}
                    defaultValue={getFieldDefaultValue("city")}
                  />
                  <TextInput
                    source={getSourceValue("street")}
                    disabled={disabledFields && disabledFields.street}
                    defaultValue={getFieldDefaultValue("street")}
                  />
                  <TextInput
                    source={getSourceValue("building")}
                    disabled={disabledFields && disabledFields.building}
                    defaultValue={getFieldDefaultValue("building")}
                  />
                  <TextInput
                    source={getSourceValue("section")}
                    disabled={disabledFields && disabledFields.section}
                    defaultValue={getFieldDefaultValue("section")}
                  />
                  <TextInput
                    source={getSourceValue("floor")}
                    disabled={disabledFields && disabledFields.floor}
                    defaultValue={getFieldDefaultValue("floor")}
                  />
                  <TextInput
                    source={getSourceValue("room")}
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

export const SubscriberCreate = () => {
  const { save } = useCreateController({
    resource: "subscribers",
    transform: (data) => _.omit(data, "type"),
  });

  const validateForm = (values: FieldValues) => {
    const errors: { humanId?: string; position?: string } = {};

    if (!values.humanId && !values.position) {
      errors.humanId = "Human or Position required";
    }

    return errors;
  };

  const { data, isLoading }: GetListI = useGetList("locations", {
    filter: { parentId: null },
  });

  if (isLoading) return null;

  const locations = data ? data : [];

  return (
    <SimpleForm
      onSubmit={save as SubmitHandler<FieldValues>}
      validate={validateForm}
    >
      <TextInput source="position" />
      <TextInput source="description" />
      <ReferenceInput
        source="humanId"
        reference="humans"
        filter={{ subscriber: { id: null } }}
        sort={{ field: "firstName", order: "ASC" }}
      >
        {/* replace by AutocompleteInput */}
        <SelectInput
          optionText={({ firstName, middleName, lastName }: Human) =>
            `${firstName} ${middleName} ${lastName}`
          }
        />
      </ReferenceInput>

      <ArrayInput source="locations">
        <SimpleFormIterator disableReordering>
          <SelectInput
            source="parentId"
            choices={locations}
            optionText="name"
            validate={required()}
          />

          <TextInput source="name" />
          <TextInput source="description" />

          <FormDataConsumer>
            {({ scopedFormData, getSource }) => {
              const location = (locations as Location[]).find(
                ({ id }) => id === scopedFormData.parentId
              );

              const disabledFields: DisabledFields = location
                ? getMapOfDisabledFields(location)
                : {};

              const getFieldDefaultValue = (field: keyof Location) =>
                location ? location[field] : undefined;

              const getSourceValue = (field: keyof Location): string =>
                (getSource && getSource(field)) as string;

              return (
                <>
                  <TextInput
                    source={getSourceValue("country")}
                    disabled={disabledFields && disabledFields.country}
                    defaultValue={getFieldDefaultValue("country")}
                  />
                  <TextInput
                    source={getSourceValue("region")}
                    disabled={disabledFields && disabledFields.region}
                    defaultValue={getFieldDefaultValue("region")}
                  />
                  <TextInput
                    source={getSourceValue("district")}
                    disabled={disabledFields && disabledFields.district}
                    defaultValue={getFieldDefaultValue("district")}
                  />
                  <TextInput
                    source={getSourceValue("city")}
                    disabled={disabledFields && disabledFields.city}
                    defaultValue={getFieldDefaultValue("city")}
                  />
                  <TextInput
                    source={getSourceValue("street")}
                    disabled={disabledFields && disabledFields.street}
                    defaultValue={getFieldDefaultValue("street")}
                  />
                  <TextInput
                    source={getSourceValue("building")}
                    disabled={disabledFields && disabledFields.building}
                    defaultValue={getFieldDefaultValue("building")}
                  />
                  <TextInput
                    source={getSourceValue("section")}
                    disabled={disabledFields && disabledFields.section}
                    defaultValue={getFieldDefaultValue("section")}
                  />
                  <TextInput
                    source={getSourceValue("floor")}
                    disabled={disabledFields && disabledFields.floor}
                    defaultValue={getFieldDefaultValue("floor")}
                  />
                  <TextInput
                    source={getSourceValue("room")}
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
