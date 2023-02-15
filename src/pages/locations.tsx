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
} from "react-admin";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { required } from "ra-core";
import { Location } from "./types";
import { useState } from "react";

export const LocationList = () => (
  <List>
    <Datagrid rowClick="show">
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
  const [currentLocation, setParentLocation] = useState<Location | undefined>();
  const { save } = useCreateController({ resource: "locations" });

  const {
    data,
    isLoading,
  }: { data: Location[] | undefined; isLoading: boolean } = useGetList(
    "locations",
    {
      filter: { parentId: null },
    }
  );

  if (isLoading) return null;

  const choices = data ? data : [];

  return (
    <SimpleForm
      onSubmit={save as SubmitHandler<FieldValues> | undefined}
      record={currentLocation}
    >
      <CheckboxGroupInput
        source="type"
        choices={[{ id: "parent", name: "Parent" }]}
      />
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          const isDisabled = !(
            Array.isArray(formData.type) && formData.type.length !== 0
          );

          return (
            <>
              <SelectInput
                source="parentId"
                choices={choices}
                optionText="name"
                disabled={isDisabled}
                validate={required()}
                onChange={({ target: { value } }) => {
                  const l = data && data.find(({ id }) => id === value);
                  setParentLocation(l);
                }}
                {...rest}
              />
              <TextInput source="name" disabled={!isDisabled} />
            </>
          );
        }}
      </FormDataConsumer>

      <TextInput source="description" />

      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <TextInput
            source="country"
            disabled={currentLocation && currentLocation.country !== null}
            {...rest}
          />
        )}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <TextInput
            source="region"
            disabled={currentLocation && currentLocation.region !== null}
            {...rest}
          />
        )}
      </FormDataConsumer>

      <TextInput source="district" />
      <TextInput source="city" />
      <TextInput source="street" />
      <TextInput source="building" />
      <TextInput source="section" />
      <TextInput source="floor" />
      <TextInput source="room" />
    </SimpleForm>
  );
};
