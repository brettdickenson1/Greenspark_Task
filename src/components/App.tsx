import { Provider } from "react-redux";
import { setupStore } from "../store/store";
import WidgetBoxes from "./WidgetBoxes/WidgetBoxes";

const App = () => {
  const store = setupStore();
  return (
    <Provider store={store}>
      <WidgetBoxes />
    </Provider>
  );
};

export default App;
