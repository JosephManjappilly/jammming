import React  from "react";


function SearchBar (props){

  const searchTerm = props.searchTerm;
  const setSearchTerm = props.setSearchTerm

  const handelKeyDown=(event)=>{
   if (event.key ==="Enter"){
    props.handleSearch();
   }
  }

  
  return (
    <div className="container text-center">
        <div className="row">
            <div className="col-8 mx-auto">
               <input 
               type="text"
               placeholder="Search for songs.." 
               className="form-control form-control-lg mt-5 mb-3"
               value={searchTerm}
               onChange={({target})=>setSearchTerm(target.value)}
               onKeyDown ={handelKeyDown}
               />
            </div>
        </div>
        <div className="row">
            <div className="col mx-auto mb-3">
               <button className="btn btn-warning btn-lg" onClick={()=>props.handleSearch()}>Search</button>
            </div>
        </div>

    </div>
  );
};

export default SearchBar;