import { Admin, ShowGuesser, Resource } from "react-admin";
import GroupsIcon from "@mui/icons-material/Groups";
import { dataProvider } from "./dataProvider";
import {
  SubscriberCreate,
  SubscriberEdit,
  SubscriberList,
} from "./pages/subscribers";
import {
  CommunicationTypeList,
  CommunicationTypeShow,
} from "./pages/communicationType";
import { CommunicationPhoneNumberList } from "./pages/communicationPhoneNembers";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="subscribers"
      list={SubscriberList}
      edit={SubscriberEdit}
      create={SubscriberCreate}
      icon={GroupsIcon}
    />
    <Resource
      name="communication_types"
      list={CommunicationTypeList}
      show={CommunicationTypeShow}
    />
    <Resource
      name="communication_phone_numbers"
      list={CommunicationPhoneNumberList}
      show={ShowGuesser}
    />
  </Admin>
);

export default App;
