import React from 'react';
import GlowingCard  from "../components/BuiltIn UI/GlowingCard.jsx";

function Home(){

    return (
    <><h1>Wellcome to home page!</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center"  }}>
      <GlowingCard />
    </div>
   
         </>
     );
}

export default Home;