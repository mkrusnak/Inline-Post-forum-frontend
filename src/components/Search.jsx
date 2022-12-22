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
      <Divider>Search</Divider>
      <Input value={searchWord} type="text" onChange={searchHandler} />
    </>
  );
}

export default Search;
