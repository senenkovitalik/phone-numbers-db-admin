import { Admin, ShowGuesser, Resource } from "react-admin";
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
  CommunicationTypeList,
  CommunicationTypeShow,
} from "./pages/communicationType";
import {
  CommunicationPhoneNumberCreate,
  CommunicationPhoneNumberEdit,
  CommunicationPhoneNumberList,
} from "./pages/communicationPhoneNembers";
import { LocationEdit, LocationList, LocationShow } from "./pages/locations";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="subscribers"
      list={SubscriberList}
      show={SubscriberShow}
      edit={SubscriberEdit}
      create={SubscriberCreate}
      icon={GroupsIcon}
    />
    <Resource
      name="communication_types"
      list={CommunicationTypeList}
      show={CommunicationTypeShow}
      icon={DynamicFormIcon}
    />
    <Resource
      name="communication_phone_numbers"
      list={CommunicationPhoneNumberList}
      show={ShowGuesser}
      edit={CommunicationPhoneNumberEdit}
      create={CommunicationPhoneNumberCreate}
      icon={NumbersIcon}
    />
    <Resource
      name="locations"
      list={LocationList}
      show={LocationShow}
      edit={LocationEdit}
      icon={LocationCityIcon}
    />
  </Admin>
);

export default App;
