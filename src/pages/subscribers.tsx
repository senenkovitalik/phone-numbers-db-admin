import {
  Datagrid,
  List,
  TextField,
  SimpleForm,
  TextInput,
  EditButton,
  Show,
  SimpleShowLayout,
  ArrayField,
  SingleFieldList,
  Link,
  FunctionField,
  ReferenceArrayInput,
  SelectArrayInput,
  useEditController,
  ReferenceInput,
  SelectInput,
  useRecordContext,
  required,
  ArrayInput,
  SimpleFormIterator,
  useCreateController,
  useGetList,
  FormDataConsumer,
  DeleteButton,
  NumberInput,
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
      <DeleteButton />
    </Datagrid>
  </List>
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
    transform: (data) => {
      const submitData = _.pick(data, [
        "humanId",
        "position",
        "description",
        "locations",
      ]);

      return _.assign(submitData, {
        locations: Array.isArray(submitData.locations)
          ? submitData.locations.map((location) =>
              _.omit(location, ["id", "__typename"])
            )
          : null,
      });
    },
  });

  const validateForm = (values: FieldValues) => {
    const errors: { humanId?: string; position?: string } = {};

    if (!values.humanId && !values.position) {
      errors.humanId = "Human or Position required";
      errors.position = "Human or Position required";
    }

    return errors;
  };

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
      // if (key === "locations" && Array.isArray(value) && value.length >= 1) {
      //   return {
      //     ...accumulator,
      //     [key]: (value as Location[]).map(({ id }: Location) => id),
      //   };
      // }

      if (key === "human" && value) {
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
      validate={validateForm}
    >
      <TextInput source="position" />
      <TextInput source="description" />
      <ReferenceInput
        source="humanId"
        reference="humans"
        filter={{ subscriber: { id: null } }}
        sort={{ field: "firstName", order: "ASC" }}
        perPage={0}
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

              const restFormFields: Array<keyof Location> = [
                "country",
                "region",
                "district",
                "city",
                "street",
                "building",
                "section",
                "floor",
                "room",
              ];

              return (
                <>
                  {restFormFields.map((field, index) => (
                    <TextInput
                      key={index}
                      source={getSourceValue(field)}
                      disabled={disabledFields && disabledFields[field]}
                      defaultValue={getFieldDefaultValue(field)}
                    />
                  ))}
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
    redirect: "list",
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
        perPage={0}
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

              const restFormFields: Array<keyof Location> = [
                "country",
                "region",
                "district",
                "city",
                "street",
                "building",
                "section",
                "floor",
                "room",
              ];

              return (
                <>
                  {restFormFields.map((field) => (
                    <TextInput
                      source={getSourceValue(field)}
                      disabled={disabledFields && disabledFields[field]}
                      defaultValue={getFieldDefaultValue(field)}
                    />
                  ))}
                </>
              );
            }}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};
