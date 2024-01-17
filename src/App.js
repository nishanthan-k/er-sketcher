import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.scss";
import ErdSketcher from "./pages/erdSketcher/ErdSketcher";
import { PaperContextProvider } from "./contexts/PaperContext";
import { OptionContextProvider } from "./contexts/OptionContext";

function App() {
  return (
    <PaperContextProvider>
      <OptionContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ErdSketcher} />
          </Switch>
        </BrowserRouter>
      </OptionContextProvider>
    </PaperContextProvider>
  );
}

export default App;
