import { useState } from "react";
import { Divider, Input } from 'antd';


function Search (props) {

  const {searchPosts} = props;

  const [searchWord, setSearchWord] = useState("");

  const searchHandler = (event) => {
    setSearchWord(event.target.value)
    searchPosts(event.target.value)
  }

 return (
    <div className="searchBar">
      <h4 >Search</h4>

      <div className="input-group rounded">
  <input type="search" className="form-control rounded searchInput" value={searchWord}  onChange={searchHandler}  aria-label="Search" aria-describedby="search-addon" />
  
</div>



      
      {/* <Input value={searchWord} type="text" onChange={searchHandler} /> */}
    </div>
  );
}

export default Search;
