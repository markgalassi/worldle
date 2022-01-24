import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";

function App() {

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
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <header className="border-b-2 border-gray-200">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-center my-1">
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
