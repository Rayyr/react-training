import axios from "axios";

//axios instance 
 const api=axios.create({
baseURL:`${process.env.REACT_APP_BASE_API_URL}`,
});

api.interceptors.response.use( 
    (res)=>{console.log("success"); return res},
    (err)=>{
        console.log("error");
        return Promise.reject(err);
    }

)


export default api;