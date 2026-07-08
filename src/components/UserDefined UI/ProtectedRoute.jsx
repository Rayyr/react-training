import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import {useContext} from 'react';
 
const ProtectedRoute = ({ children ,allowedRoles}) => {
 
   const {user}=useContext(AuthContext);
 
   //this case is make a sense in case the user session has been expired after he logged in then he make a refresh for the page he is in but otherwise it is seemless
   //Redirect unauthorized (either students or admins) away from private routes.===not logged in successfully
   if(!user){
     
     return <Navigate to="/login"/>
   }

    //Role not allowed,usefull in case there is a puplic navlink but in my case i customize the navbar based to roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
     console.log(user);
    return <Navigate to="/home" replace />;
  }

   //authorized users + based to allowed roles
   return children;//anything inside ProtectedRoute component as we said previoslly
};

export default ProtectedRoute;