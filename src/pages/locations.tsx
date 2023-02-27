import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
  Show,
  SimpleShowLayout,
  SelectInput,
  FormDataConsumer,
  CheckboxGroupInput,
  useCreateController,
  useGetList,
  Create,
} from "react-admin";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { required } from "ra-core";
import _ from "lodash";
import { DisabledFields, GetListI, Location } from "./types";
import { getMapOfDisabledFields } from "../utils";

export const LocationList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="parentId" />
      <TextField source="description" />
      <TextField source="country" />
      <TextField source="region" />
      <TextField source="district" />
      <TextField source="city" />
      <TextField source="street" />
      <TextField source="building" />
      <TextField source="section" />
      <TextField source="floor" />
      <TextField source="room" />
      <EditButton />
    </Datagrid>
  </List>
);

export const LocationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="country" />
      <TextInput source="region" />
      <TextInput source="district" />
      <TextInput source="city" />
      <TextInput source="street" />
      <TextInput source="building" />
      <TextInput source="section" />
      <TextInput source="floor" />
      <TextInput source="room" />
    </SimpleForm>
  </Edit>
);

export const LocationShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="country" />
      <TextField source="region" />
      <TextField source="district" />
      <TextField source="city" />
      <TextField source="street" />
      <TextField source="building" />
      <TextField source="section" />
      <TextField source="floor" />
      <TextField source="room" />
    </SimpleShowLayout>
  </Show>
);

export const LocationCreate = () => {
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
      <CheckboxGroupInput
        source="type"
        choices={[{ id: "parent", name: "Parent" }]}
      />

      <FormDataConsumer>
        {({ formData, ...rest }) => {
          const isDisabled =
            Array.isArray(formData.type) && formData.type.length !== 0;

          return (
            <>
              <SelectInput
                source="parentId"
                choices={locations}
                optionText="name"
                disabled={isDisabled}
                validate={!isDisabled ? required() : undefined}
                {...rest}
              />
              <TextInput
                source="name"
                label="Name"
                validate={isDisabled ? required() : undefined}
              />
            </>
          );
        }}
      </FormDataConsumer>

      <TextInput source="description" />

      <FormDataConsumer>
        {({ formData, ...rest }) => {
          const { type, parentId } = formData;

          const isLocationSet = !(
            Array.isArray(type) && type.includes("parent")
          );

          const location =
            isLocationSet &&
            (locations.find(({ id }) => id === parentId) as Location);

          const disabledFields: DisabledFields = location
            ? getMapOfDisabledFields(location)
            : {};

          const getFieldDefaultValue = (field: keyof Location) =>
            location ? location[field] : undefined;

          return (
            <>
              <TextInput
                source="country"
                disabled={disabledFields && disabledFields.country}
                defaultValue={getFieldDefaultValue("country")}
                {...rest}
              />
              <TextInput
                source="region"
                disabled={disabledFields && disabledFields.region}
                defaultValue={getFieldDefaultValue("region")}
                {...rest}
              />
              <TextInput
                source="district"
                disabled={disabledFields && disabledFields.district}
                defaultValue={getFieldDefaultValue("district")}
                {...rest}
              />
              <TextInput
                source="city"
                disabled={disabledFields && disabledFields.city}
                defaultValue={getFieldDefaultValue("city")}
                {...rest}
              />
              <TextInput
                source="street"
                disabled={disabledFields && disabledFields.street}
                defaultValue={getFieldDefaultValue("street")}
                {...rest}
              />
              <TextInput
                source="building"
                disabled={disabledFields && disabledFields.building}
                defaultValue={getFieldDefaultValue("building")}
                {...rest}
              />
              <TextInput
                source="section"
                disabled={disabledFields && disabledFields.section}
                defaultValue={getFieldDefaultValue("section")}
                {...rest}
              />
              <TextInput
                source="floor"
                disabled={disabledFields && disabledFields.floor}
                defaultValue={getFieldDefaultValue("floor")}
                {...rest}
              />
              <TextInput
                source="room"
                disabled={disabledFields && disabledFields.room}
                defaultValue={getFieldDefaultValue("room")}
                {...rest}
              />
            </>
          );
        }}
      </FormDataConsumer>
    </SimpleForm>
  );
};
