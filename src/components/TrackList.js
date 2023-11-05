import React from "react";

function TrackList(props) {
  // Extract the selected tracks from props
  const selectedTrack = props.selectedTrack;


  const listStyle = {                           
    backgroundColor: 'rgba(0, 0, 128, 0.7)',
    color:'white',
    border:'none',
    textAlign:'center',
    
};
const buttonStyle ={
    color:'orange',
    fontSize:'30px',
    backgroundColor: 'rgba(0, 0, 128, 0)',
};


 
    return (
        <>
            {selectedTrack.map((track) => (
              <li key={track.id} className="list-group-item py-0 " style={listStyle}>
               <div className="d-flex justify-content-between">
                 <div className="d-block text-left">
                   <h4>{track.name}</h4>
                   <p>{track.artist}| {track.album} </p>
                 </div>
                 <button className="btn" style={buttonStyle} onClick={()=>props.removeSelectedTrack(track)} > - </button>
               </div>
               <hr style={{ backgroundColor: 'white', width: '100%', height: '2px' }} />
              </li>
            ))}

        </>
      );
  
}

export default TrackList;
