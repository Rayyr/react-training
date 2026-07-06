import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import {useContext} from 'react';

const ProtectedRoute = ({ children }) => {
 
   const {user}=useContext(AuthContext);
   if(!user){
     return <Navigate to="/login"/>
   }

   return children;//anything inside ProtectedRoute component as we said previoslly
};

export default ProtectedRoute;