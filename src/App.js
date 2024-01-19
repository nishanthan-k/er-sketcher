import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.scss";
import ErdSketcher from "./pages/erdSketcher/ErdSketcher";
import { PaperContextProvider } from "./contexts/PaperContext";
import { OptionContextProvider } from "./contexts/OptionContext";
import ShapeContextProvider from "./contexts/ShapeContext";

function App() {
  return (
    <PaperContextProvider>
      <ShapeContextProvider>
        <OptionContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={ErdSketcher} />
            </Switch>
          </BrowserRouter>
        </OptionContextProvider>
      </ShapeContextProvider>
    </PaperContextProvider>
  );
}

export default App;
