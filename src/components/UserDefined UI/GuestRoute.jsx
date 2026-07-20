import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigationType } from "react-router-dom";

//tp process if logged-in user tries to acces such as pages which are being wrapped inside GuestRoute
function GuestRoute({ setIsBlocked, children }) {
  const { user } = useContext(AuthContext);
  const toastShown = useRef(false); // ✅ prevent multi toast msg appear

const navigationType = useNavigationType();

  if (user && navigationType==="POP") {
    if (!toastShown.current) {
      toast.error("Sign out first !", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });

      toastShown.current = true;
    }

    return <Navigate to="/wellcome" replace />;
  }

  return children;
}

export default GuestRoute;