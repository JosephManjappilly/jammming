import React from "react";
import TrackList from "./TrackList";


function PlayList (props) {
   
    // properties passed from App.js and later passed on to Tracklist
    const selectedTrack = props.selectedTrack;
    const removeSelectedTrack =props.removeSelectedTrack;
    // properties from App.js to handel the playlist name 
    const playlistName = props.playlistName;
    const setPlayListName = props.setPlayListName;
    // property passed from App.js to save playlist to spotify 
    const handelSaveToSpotify = props.handelSaveToSpotify;
    
    const listStyle = {                           
        backgroundColor: 'rgba(0, 0, 128, 0.7)',
        color:'white',
        border:'none',
        textAlign:'center',
        
    };
    const inputStyle ={
        backgroundColor: 'rgba(0, 0, 128, 0)',
        color:'white',
        border:'none',
        textAlign:'center',
    }

    return (
        <>
        <ul className="list-group mb-3" style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.6)'}}> 
         <li className="list-group-item py-0 " style={listStyle}>
            <input 
              type="text"
              placeholder="Enter you custom playlist name.." 
              className="form-control form-control-lg my-2" 
              style={inputStyle}           
              value={playlistName}
              onChange={({target})=> setPlayListName(target.value)}
            />
    
         </li>
         <TrackList selectedTrack={selectedTrack} removeSelectedTrack={removeSelectedTrack}  />
         <li className="list-group-item py-0 " style={listStyle}>
            <button className="btn btn-warning my-4" style={{width:'30%',textAlign:"center"}} onClick={()=>handelSaveToSpotify()} >
                Save to Sporify
            </button>
        </li> 

        </ul>
        </>
    );
};

export default PlayList;