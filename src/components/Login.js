import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function Login (props){

    const {isLoggedIn , handleLogout , authUrl} = props;

    return(
    <>
    {isLoggedIn ? (<button className="btn btn-success ml-5 mt-3" onClick={()=>handleLogout()}> Logged in successfully ! | Click here to logout</button>)
    :(<a className="btn btn-success ml-5 mt-3" href={authUrl}><FontAwesomeIcon icon={faSpotify}/> Login to Spotify</a>)}
      
    </>
   
    );
    
    

};

export default Login;