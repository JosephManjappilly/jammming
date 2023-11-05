import React, { useState , useEffect } from "react";
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults";
import PlayList from "./PlayList";
import Login from "./Login";


function App (){
   
  const[selectedTrack,setSelectedTrack]=useState([]);  // to handel data from selected SearchResults

  const[searchTerm,setSearchTerm] = useState('');  // to handel searchkey word

  const[isLoggedIn , setIsLoggedIn] = useState(false); // to handel state of loggedin

  const[trackResult,setTrackResult] = useState([]); // to handel serach results obtained from spotify

  const[playlistName, setPlayListName] = useState(''); // to handle the name of the playlist to be saved to spotify

  const[playlistUri,setPlayListUri] = useState ([]);  // to handle uri of selected tracks by user

  
  // For access token generation

  const clientId = 'db7c15e318dc428189eb0552f5060b9d'; 
  const redirectUri = 'http://localhost:3000'; 
  const scopes = 'playlist-modify-public'; 
  
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;   
  

   useEffect(()=>{

    // extration of accesstoken and expiry time

    const url = new URL(window.location.href);
    const accessToken = url.hash.split('&')[0].slice(14);
    if(accessToken){
      const expiresIn = parseInt(url.hash.split('&expires_in=')[1]);
      localStorage.setItem('accessToken',accessToken);
      localStorage.setItem('tokenExpiration', Date.now()+ expiresIn*1000);
      setIsLoggedIn(true);
    }
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    //  on expiry requesting new token
    
    if(tokenExpiration && Date.now()>= tokenExpiration){
     
      alert('Your session has been expired , you will be redirected to spotify login page');

       localStorage.removeItem('accessToken');
       localStorage.removeItem('tokenExpiration');
       setIsLoggedIn(false);

       window.location.href = authUrl;
        
    }
  },[authUrl]);

 // function to extract selected tracks from SearchResults(plus button action)

  const addSelectedTrack =(track)=>{                  
     setSelectedTrack((prev)=>prev.some((item)=> item.id === track.id)?prev:[...prev,track])
  };

 // function to remove selected tracks from Tracklist(minus button action)  

  const removeSelectedTrack =(track)=>{                  
      setSelectedTrack((prev)=> prev.filter((item)=>item.id !== track.id));
  };
  
  //function to handle logout 

  const handleLogout = ()=>{

    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    window.history.replaceState({}, document.title, window.location.pathname);
    setTrackResult([]);
    setSelectedTrack([]);
  }
  
  // function to search data from spotify data base
  
  const handleSearch =async ()=>{                   

    const endpoint = 'https://api.spotify.com/v1/search';
    const type = 'track';
    const limit = 10;
    if(!isLoggedIn){      // to ensure that the user is logged in before performng search
      alert('Please login to spotify');
    }
    // Search executed only if logged in
    else if (isLoggedIn){  
      try{
        const response = await fetch(`${endpoint}?q=${searchTerm}&type=${type}&limit=${limit}`,{
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if(response.ok){ 
          const searchData = await response.json();
          const tracks = searchData.tracks.items.map((item)=>({
            id:item.id,
            name:item.name,
            artist:item.artists[0].name,
            album:item.album.name,
            uri:item.uri
          })); 
          setTrackResult(tracks);
        }
        else{
          console.log('Error in Spotify search request:', response.status);
        }
      }
      catch(error){
        console.log('Error in Spotify search request:',error);
      }
    }
    setSearchTerm('');  
  };

 // function to save playlist to spotify

  const handelSaveToSpotify= async()=>{
    if(!playlistName){
      alert('Please enter a playlist name');
    }
    // extracting uri of selected tracks by user
    setPlayListUri(selectedTrack.map((track)=>track.uri)); 

  };
// Effect hook will add playlist to spotify when playlistUri is updated
  useEffect(()=>{
    // to ensure that the function is executed only after creating playlistUri
    if (playlistUri.length > 0){
      const addPlayListToSpotify = async ()=>{
        // for getting userID to create a playlist
       const userReponse = await fetch('https://api.spotify.com/v1/me',{
         headers:{
           Authorization:`Bearer ${localStorage.getItem('accessToken')}`
         }
         });
       const userData = await userReponse.json();
       const userId = userData.id;

       // Creating a spotify playlist
       const createPlayListResponse = await fetch (`https://api.spotify.com/v1/users/${userId}/playlists`,{
         method:'POST',
         headers:{
           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
           'Content-Type': 'application/json'
           },
         body:JSON.stringify({
           name:playlistName,
           description:'Created by Jammming'
           })
         });
       const newPlayListData = await createPlayListResponse.json();
       const playListId = newPlayListData.id;
     
       // Adding selected tracks to created playlist
       const addTracksresponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,{
           method:'POST',
           headers:{
             Authorization : `Bearer ${localStorage.getItem('accessToken')}`,
           'Content-type': 'application/json'
           },
          body:JSON.stringify({
           uris:playlistUri
           })
       }); 
       if(addTracksresponse.ok){
        alert('You have sucessfully created ur custom playList');
        setTrackResult([]);
        setSelectedTrack([]);
        setPlayListName('');
        setPlayListUri([]);
       }
 
       }
       addPlayListToSpotify();
    }
 
  },[playlistUri,playlistName]);

  return(
    <>
    <nav className="navbar sticky-top navbar-dark rounded-bottom" style={{backgroundColor:'#04346c',color:'#f8ecf3'}}>
      <h1 className="mx-auto" >Ja<span style={{color:'#FFA500'}}>mmm</span>inG</h1>
    </nav>
    <Login isLoggedIn = {isLoggedIn} handleLogout = {handleLogout} authUrl = {authUrl}/>
    <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    <div className="container">
      <div className="row">
        <div className="col ">
         <SearchResults addSelectedTrack={addSelectedTrack} trackResult ={trackResult} />    {/* function pass as a prop to SearchResults to extract data*/}
        </div>
         <div className="col">  {/* To make sure that Trasklist is not rendered until plus button is pressed |selectedTrack from state hook pased to Traklist*/}
         {selectedTrack.length > 0 &&
        <PlayList 
        selectedTrack={selectedTrack} 
        removeSelectedTrack ={removeSelectedTrack} 
        playlistName={playlistName} 
        setPlayListName={setPlayListName}
        handelSaveToSpotify={handelSaveToSpotify}
          />} 
        </div> 
      </div>
    </div>
    </>
  )
};

export default App;