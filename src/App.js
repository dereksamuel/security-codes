import { UseState } from "./UseState/index";
import { UseReducer } from "./UseReducer/index";
// import { ClassState } from "./ClassState/index";

import "./App.css";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReducer" />
      {/* <ClassState name="ClassState" /> */}
    </div>
  );
}

export default App;
