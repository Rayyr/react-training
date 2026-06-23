import StudentCard from "./components/StudentCard";
import { ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  return (
    <>
      <StudentCard />
      <ToastContainer />
      {/* for app notification to be in complete project scope*/}
    </>
  );
}

export default App;
