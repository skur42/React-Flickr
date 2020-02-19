import React from "react";

const Navigation = (props) => {
  const searchList = JSON.parse(localStorage.getItem('search-key'));

  return (
    <header className="flex fixed flex-col w-full h-48 bg-gray-900 items-center justify-center
      top-0 left-0 z-10">
      <h1 className="text-white text-2xl font-semibold">Search Photos</h1>
      <input className="mt-5 py-2 px-3 w-1/4" 
        type="text"
        placeholder="Type here to search"
        autoFocus
        value={props.searchValue}
        onChange={props.onChangeInput}/>
      <ul className="flex mt-4">
        {searchList.map(value =>
          <li key={value} onClick={props.onChangeInput.bind(null, { target: { value: value } })}
            className="mx-2 text-white font-mono cursor-pointer">
            {value}
          </li>
        )}
      </ul>
    </header>
  )
};

export default Navigation;