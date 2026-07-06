import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import {useContext} from 'react';

const ProtectedRoute = ({ children }) => {
 
   const {user}=useContext(AuthContext);
  //Redirect unauthorized users away from private routes.
   if(!user){
     return <Navigate to="/login"/>
   }

   //authorized users 
   return children;//anything inside ProtectedRoute component as we said previoslly
};

export default ProtectedRoute;