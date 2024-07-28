import { MainCanvas } from "./components/content/canvas/MainCanvas";
import { ClientSocketControl } from "./components/utilComponents/ClientSocketControl";

function App() {
  return (
    <>
      <MainCanvas />
      <ClientSocketControl />
    </>
  );
}

export default App;
