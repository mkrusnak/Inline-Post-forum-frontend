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
    <>
      <h2>Search</h2>
      <Input value={searchWord} type="text" onChange={searchHandler} />
    </>
  );
}

export default Search;
