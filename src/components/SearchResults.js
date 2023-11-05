import React from "react";

function SearchResults(props){


const trackResult = props.trackResult;

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
     <ul className="list-group mb-3" style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.6)'}}>
       {trackResult.length >0 && <li className="list-group-item" style={listStyle}><h2 >Results</h2></li>}
        {/* To be replaced with logic for actual data from API*/}
       {trackResult.map((result)=>(                                                                
         <li key={result.id} className="list-group-item py-0 " style={listStyle} >
            <div className="d-flex justify-content-between">
              <div className="d-block text-left" >
                <h4>{result.name}</h4>
                <p>{result.artist}| {result.album} </p>
              </div>
              <button className="btn" style={buttonStyle} onClick={()=>props.addSelectedTrack(result)}> + </button>
            </div>
            <hr style={{ backgroundColor: 'white', width: '100%', height: '2px' }} />
        </li> 
       ))}

     </ul>
    </>
);


};

export default SearchResults;