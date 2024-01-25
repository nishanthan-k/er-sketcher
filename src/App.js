import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.scss";
import ErdSketcher from "./pages/erdSketcher/ErdSketcher";
import { PaperContextProvider } from "./contexts/PaperContext";
import { OptionContextProvider } from "./contexts/OptionContext";
import ShapeContextProvider from "./contexts/ShapeContext";
import LinkContextProvider from "./contexts/LinkContext";
// import Test from "./Test";

function App() {
  return (
    <PaperContextProvider>
      <ShapeContextProvider>
        <LinkContextProvider>
          <OptionContextProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/" component={ErdSketcher} />
              </Switch>
            </BrowserRouter>
          </OptionContextProvider>
        </LinkContextProvider>
      </ShapeContextProvider>
    </PaperContextProvider>
    // <Test />
  );
}

export default App;
