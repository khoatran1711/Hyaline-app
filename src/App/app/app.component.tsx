import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { RootPersistor, RootStore } from "../domain";
import { Browser } from "./browser.component";

const App = () => {
  return (
    <Provider store={RootStore}>
      <PersistGate persistor={RootPersistor}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Browser />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
