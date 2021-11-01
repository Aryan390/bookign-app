const Search = (props) => {

  const searchChangeHandler = (e) => {
    props.onSearchRes(e.target.value)
  }

  return (
    <div className="search-box">
      <i className="material-icons">search</i>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search Movies..."
        onChange={searchChangeHandler}
        value = {props.searchVal}
      />
    </div>
  )
}

export default Search