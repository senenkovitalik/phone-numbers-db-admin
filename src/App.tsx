import { Admin, ListGuesser, Resource } from "react-admin";
import GroupsIcon from "@mui/icons-material/Groups";
import { dataProvider } from "./dataProvider";
import {
  SubscriberCreate,
  SubscriberEdit,
  SubscriberList,
} from "./pages/subscribers";
import { CommunicationTypeList } from "./pages/communicationType";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="subscribers"
      list={SubscriberList}
      edit={SubscriberEdit}
      create={SubscriberCreate}
      icon={GroupsIcon}
    />
    <Resource name="communication_types" list={CommunicationTypeList} />
    <Resource name="communication_phone_numbers" list={ListGuesser} />
  </Admin>
);

export default App;
