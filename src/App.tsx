import { Admin, Resource } from "react-admin";
import GroupsIcon from '@mui/icons-material/Groups';
import { dataProvider } from "./dataProvider";
import {
  SubscriberCreate,
  SubscriberEdit,
  SubscriberList,
} from "./pages/subscribers";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="subscribers"
      list={SubscriberList}
      edit={SubscriberEdit}
      create={SubscriberCreate}
      icon={GroupsIcon}
    />
  </Admin>
);

export default App;
