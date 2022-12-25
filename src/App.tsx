import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { SubscriberEdit, SubscriberList } from "./pages/subscribers";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="subscribers" list={SubscriberList} edit={SubscriberEdit} />
  </Admin>
);

export default App;
