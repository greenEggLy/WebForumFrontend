import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { RootRouter } from "./RootRouter.tsx";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
