import { Admin, ListGuesser, Resource } from "react-admin";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import NumbersIcon from "@mui/icons-material/Numbers";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

import { dataProvider } from "./dataProvider";
import {
  SubscriberCreate,
  SubscriberEdit,
  SubscriberList,
  SubscriberShow,
} from "./pages/subscribers";
import {
  CommunicationTypeCreate,
  CommunicationTypeEdit,
  CommunicationTypeList,
  CommunicationTypeShow,
} from "./pages/communicationType";
import {
  CommunicationPhoneNumberCreate,
  CommunicationPhoneNumberEdit,
  CommunicationPhoneNumberList,
  CommunicationPhoneNumberShow,
} from "./pages/communicationPhoneNembers";
import {
  LocationCreate,
  LocationEdit,
  LocationList,
  LocationShow,
} from "./pages/locations";
import { HumanList } from "./pages/humans";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="humans" list={HumanList} />
    <Resource
      name="subscribers"
      list={SubscriberList}
      // show={SubscriberShow}
      edit={SubscriberEdit}
      create={SubscriberCreate}
      icon={GroupsIcon}
    />
    <Resource
      name="communication_types"
      list={CommunicationTypeList}
      show={CommunicationTypeShow}
      edit={CommunicationTypeEdit}
      create={CommunicationTypeCreate}
      icon={DynamicFormIcon}
    />
    <Resource
      name="communication_phone_numbers"
      list={CommunicationPhoneNumberList}
      show={CommunicationPhoneNumberShow}
      edit={CommunicationPhoneNumberEdit}
      create={CommunicationPhoneNumberCreate}
      icon={NumbersIcon}
    />
    <Resource
      name="locations"
      list={LocationList}
      // show={LocationShow}
      // edit={LocationEdit}
      create={LocationCreate}
      icon={LocationCityIcon}
    />
  </Admin>
);

export default App;
