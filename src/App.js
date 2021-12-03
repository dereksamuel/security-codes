import { UseState } from "./UseState/index";
import { ClassState } from "./ClassState/index";

import "./App.css";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;
