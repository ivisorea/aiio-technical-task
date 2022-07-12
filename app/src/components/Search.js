import React from 'react'
import { SearchContainer } from '../styles'

export const Search = ({data, key,setSuggestions, setSearchValue, searchValue}) => {
  const onChangeHandler = (searchValue) => {
    let matches = []
    if (searchValue.length > 0) {
        matches = data.filter(subCategory => subCategory[key].toLowerCase().includes(searchValue.toLowerCase()))
    }
    setSuggestions(matches)
    setSearchValue(searchValue)
  }
  
  return (
    <SearchContainer>
        <input 
            style={{with: '100%', height: '2rem', border: '1px solid #ccc', borderRadius: '0.2rem', padding: '0.5rem'}}
            type='search' 
            placeholder='search'
            value={searchValue}
            onChange={(e) => onChangeHandler(e.target.value)}
            />
    </SearchContainer>
  )
}
