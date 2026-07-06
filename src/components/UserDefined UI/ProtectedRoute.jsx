import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import {useContext} from 'react';

const ProtectedRoute = ({ children ,allowedRoles}) => {
 
   const {user}=useContext(AuthContext);
 
   //Redirect unauthorized (either students or admins) away from private routes.===not logged in successfully
   if(!user){
     return <Navigate to="/login"/>
   }

    //Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/wellcome" replace />;
  }

   //authorized users + based to allowed roles
   return children;//anything inside ProtectedRoute component as we said previoslly
};

export default ProtectedRoute;