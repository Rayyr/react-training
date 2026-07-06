import React,{useContext} from 'react';
 import {AuthContext} from '../context/AuthContext.js';

function Home(){

    const {logout}=useContext(AuthContext);

     
    return (
    <><h1>Wellcome to home page!</h1>
     <button onClick={()=>logout()}>Logout</button>
         </>
     );
}

export default Home;