import React from 'react'
import { useState, useEffect } from 'react'
import { Button, SubCategoriesContainer, HeaderTable, SubCategoriesWrapper, Article, Wrapper, ButtonWrapper, ArticleWrapper, SubContainer } from '../styles'
import { TiPlus } from 'react-icons/ti'
import { BsChevronDown } from 'react-icons/bs'

export const SubCategories = ({productId}) => {
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    
    useEffect(() => {
        try {
            fetch('http://localhost:3002/subcatergories')
                .then(res => res.json())
                .then(data => {
                    // eslint-disable-next-line array-callback-return
                    setSubCategories(data.filter(subCategory => subCategory.productId == productId))
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }, [productId])

    const onChangeHandler = (searchValue) => {
        let matches = []
        if (searchValue.length > 0) {
            matches = subCategories.filter(subCategory => subCategory.subCategoryName.toLowerCase().includes(searchValue.toLowerCase()))
        }
        setSuggestions(matches)
        setSearchValue(searchValue)
    }
  return (
    <SubCategoriesContainer>
            <HeaderTable>
                <ArticleWrapper>
                    <Article>Select subcategories</Article>
                </ArticleWrapper>
                <ButtonWrapper>
                   <BsChevronDown style={{color: 'white'}}/>
                </ButtonWrapper>
            </HeaderTable>
            <SubCategoriesWrapper>
                <input 
                style={{with: '100%', height: '2rem', border: '1px solid #ccc', borderRadius: '0.2rem', padding: '0.5rem'}}
                type='search' 
                placeholder='search'
                value={searchValue}
                onChange={(e) => onChangeHandler(e.target.value)}
                />
                {
                    suggestions.length > 0 ? (
                        suggestions.map(suggestion => (
                            <Wrapper key={suggestion.subCategoryId}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                <label>{suggestion.subCategoryName}</label>
                                <input type="checkbox"
                                    name="subCategory"
                                    value={suggestion.subCategoryName}
                                />
                                </div>
                            </Wrapper>
                        ))
                    ):(
                        loading ? <h1>Loading...</h1> :
                        subCategories.map(subCategory => (
                            <Wrapper key={subCategory.subCategoryId}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                    <label>{subCategory.subCategoryName}</label>
                                    <input type="checkbox" 
                                        name="subCategory"
                                        value={subCategory.subCategoryId}
                                    />
                                </div>
                            </Wrapper>
                    ))
                    )
                }
            </SubCategoriesWrapper>
            <Button><TiPlus/>ADD PRODUCTS</Button>
        </SubCategoriesContainer>
  )
}
