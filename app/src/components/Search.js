import React from 'react'
import { SearchContainer } from '../styles'

export const Search = ({data, params, setSuggestions, setSearchValue, searchValue}) => {
  const onChangeHandler = (searchValue) => {
    let matches = []
    if (searchValue.length > 0) {
        matches = data.filter(subCategory => subCategory[params].toLowerCase().includes(searchValue.toLowerCase()))
    }
    setSuggestions(matches)
    setSearchValue(searchValue)
  }
  
  return (
    <SearchContainer>
        <input 
            type='search' 
            placeholder='search'
            value={searchValue}
            onChange={(e) => onChangeHandler(e.target.value)}
            />
    </SearchContainer>
  )
}
