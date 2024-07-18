import { TITLE } from "./lib/data";

import Game from "./components/Game";

function App() {
  return (
    <div>
      <h1 className="title">{TITLE}</h1>
      <Game></Game>
    </div>
  );
}

export default App;
