import StudentCard from "./components/StudentCard";
import { ToastContainer ,Bounce} from "react-toastify";

import "./App.css";

function App() {
  return (
    <>
      <StudentCard />
     <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover={false}
theme="light"
transition={Bounce}
/>
      {/* for app notification to be in complete project scope*/}
    </>
  );
}

export default App;
