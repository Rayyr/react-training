import StudentCard from "./components/UserCard";
import { ToastContainer, Bounce } from "react-toastify";

import "./App.css";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";

function App() {
  return (
    <>
        <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onError={(error, info) => {
        // Log the error to your error reporting service
      }}
      onReset={() => {
        // Reset any state that may have caused the error
      }}
    >

  
      <StudentCard />
      <ToastContainer
        position="top-right"
        autoClose={600}
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
     </ErrorBoundary>
    </>
  );
}

export default App;
