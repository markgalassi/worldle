import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";
import { useState } from "react";
import { Infos } from "./components/Infos";

function App() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        theme="light"
        autoClose={2000}
        bodyClassName="font-bold text-center"
      />
      <Infos
        isOpen={infoOpen}
        close={() => setInfoOpen(false)}
      />
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <header className="border-b-2 border-gray-200 flex">
            <button
              className="mx-1 text-xl"
              type="button"
              onClick={() => setInfoOpen(true)}
            >
              ❔
            </button>
            <h1 className="text-4xl font-bold uppercase tracking-wide text-center my-1 flex-auto">
              Wor<span className="text-green-600">l</span>dle
            </h1>
          </header>
          <Game />
        </div>
      </div>
    </>
  );
}

export default App;
