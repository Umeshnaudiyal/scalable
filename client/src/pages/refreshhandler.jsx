import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function Refreshhandler({setisauthorized}) {
    const navigate=useNavigate();
    const location=useLocation();
      
     
  useEffect(() => {
     if(JSON.parse(localStorage.getItem('token'))){
        setisauthorized(true);
     if(location.pathname=='/Login'||location.pathname=='/signup'||location.pathname=='/'||location.pathname=='/login'){
            navigate('/dashboard');
        }
    }
  },[navigate,location,setisauthorized]); 

    return ( <div>

    </div> );
}

export default Refreshhandler;