import { Admin, Resource } from "react-admin";
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
    />
  </Admin>
);

export default App;
