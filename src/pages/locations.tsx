import { useState } from "react";
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
import _ from "lodash";
import { Location } from "./types";
import { getMapOfDisabledFields } from "../utils";

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

interface GetListI {
  data: Location[] | undefined;
  isLoading: boolean;
}

const locations = [
  {
    id: 4,
    name: "BANDALONG",
    description: null,
    country: "Ukraine",
    region: "Lviv",
    district: "Lviv",
    city: null,
    street: "Bandery",
    building: "1",
    section: null,
    floor: null,
    room: null,
    __typename: "Location",
  },
  {
    id: 3,
    name: "ARRAKEEN",
    description: null,
    country: "Ukraine",
    region: "Poltava",
    district: "Poltava",
    city: null,
    street: "Bohuna",
    building: "15",
    section: null,
    floor: null,
    room: null,
    __typename: "Location",
  },
  {
    id: 2,
    name: "KALADAN",
    description: null,
    country: "Ukraine",
    region: "Rivne",
    district: "Rivne",
    city: null,
    street: "Petra Mohily",
    building: "5",
    section: null,
    floor: null,
    room: null,
    __typename: "Location",
  },
  {
    id: 1,
    name: "ARRAKIS",
    description: null,
    country: "Ukraine",
    region: "Zhytomir",
    district: null,
    city: "Yaropovichi",
    street: "Sichovich Striltciv",
    building: "45",
    section: null,
    floor: null,
    room: null,
    __typename: "Location",
  },
];

export const LocationCreate = () => {
  const [currentLocation, setParentLocation] = useState<Location | null>(null);
  const { save } = useCreateController({ resource: "locations" });

  // const { data, isLoading }: GetListI = useGetList("locations", {
  //   filter: { parentId: null },
  // });

  // if (isLoading) return null;

  // const choices = data ? data : [];

  const disabledFields: {
    [key in keyof Location]?: boolean;
  } = currentLocation ? getMapOfDisabledFields(currentLocation) : {};

  return (
    <SimpleForm
      onSubmit={save as SubmitHandler<FieldValues> | undefined}
      record={_.omit(currentLocation, "name")}
    >
      <CheckboxGroupInput
        source="type"
        choices={[{ id: "parent", name: "Parent" }]}
        onChange={(choices) => {
          if (!(choices as string[]).includes("parent")) {
            setParentLocation(null);
          }
        }}
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
                validate={required()}
                onChange={({ target: { value } }) => {
                  const l = locations.find(({ id }) => id === value);
                  setParentLocation(l ? l : null);
                }}
                {...rest}
              />
              <TextInput
                source="name"
                label="Parent location name"
                disabled={!isDisabled}
              />
            </>
          );
        }}
      </FormDataConsumer>

      <TextInput source="description" />

      <TextInput
        source="country"
        disabled={disabledFields && disabledFields.country}
      />
      <TextInput
        source="region"
        disabled={disabledFields && disabledFields.region}
      />
      <TextInput
        source="district"
        disabled={disabledFields && disabledFields.district}
      />
      <TextInput
        source="city"
        disabled={disabledFields && disabledFields.city}
      />
      <TextInput
        source="street"
        disabled={disabledFields && disabledFields.street}
      />
      <TextInput
        source="building"
        disabled={disabledFields && disabledFields.building}
      />
      <TextInput
        source="section"
        disabled={disabledFields && disabledFields.section}
      />
      <TextInput
        source="floor"
        disabled={disabledFields && disabledFields.floor}
      />
      <TextInput
        source="room"
        disabled={disabledFields && disabledFields.room}
      />
    </SimpleForm>
  );
};
