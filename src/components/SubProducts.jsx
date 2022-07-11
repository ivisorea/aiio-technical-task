import React from 'react'
import { useState} from 'react'
import { Button, 
        SubProductsContainer, 
        HeaderTable, 
        SubCategoriesWrapper, 
        Article, 
        Wrapper, 
        ButtonWrapper, 
        ArticleWrapper } from '../styles'
import { TiPlus } from 'react-icons/ti'
import { BsChevronDown } from 'react-icons/bs'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useFetchData } from '../utilities/hooks/useFetchData'

export const SubProducts = ({subCategoryId}) => {
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { data, loading } = useFetchData('http://localhost:3008/subproducts', 'subCategoryId', subCategoryId)
    const { register } = useFormContext();
    useFieldArray({name: 'subCategories' });

    const onChangeHandler = (searchValue) => {
        let matches = []
        if (searchValue.length > 0) {
            matches = data.filter(subProduct => subProduct.subProductName.toLowerCase().includes(searchValue.toLowerCase()))
        }
        setSuggestions(matches)
        setSearchValue(searchValue)
    }

  return (
    <SubProductsContainer>
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
                            <Wrapper key={suggestion.subProductId}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                <label>{suggestion.subProductName}</label>
                                <input type="checkbox"
                                    name="subProduct"
                                    value={suggestion.subProductName}
                                />
                                </div>
                            </Wrapper>
                        ))
                    ):(
                        loading ? <h1>Loading...</h1> :
                        data.map(subProduct => (
                            <Wrapper key={subProduct.subProductId}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                    <label>{subProduct.subProductName}</label>
                                    <input type="checkbox" 
                                        name={`subProduct${subProduct.subProductId}`}
                                        value={subProduct.subProductName}
                                        {...register(`subProducts.${subProduct.subProductId}.name`)}
                                    />
                                </div>
                            </Wrapper>
                    ))
                    )
                }
            </SubCategoriesWrapper>
            <Button><TiPlus/>ADD PRODUCTS</Button>
        </SubProductsContainer>
  )
}
