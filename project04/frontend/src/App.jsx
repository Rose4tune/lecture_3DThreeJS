import { RecoilRoot } from "recoil";
import { ClientSocketControl } from "./components/utilComponents/ClientSocketControl";
import { Content } from "./components/content/Content";

function App() {
  return (
    <RecoilRoot>
      <Content />
      <ClientSocketControl />
    </RecoilRoot>
  );
}

export default App;
