import React from 'react'
import { useState} from 'react'
import { Button, 
        SubCategoriesContainer, 
        HeaderTable, 
        SubCategoriesWrapper, 
        Article, 
        Wrapper,  
        ButtonWrapper, 
        ArticleWrapper} from '../styles'
import { TiPlus } from 'react-icons/ti'
import { BsChevronDown } from 'react-icons/bs'
import { useFetchData } from '../utilities/hooks/useFetchData'
import { SubProducts } from './SubProducts'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const SubCategories = ({productId}) => {
    
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const { data, loading } = useFetchData('http://localhost:3002/subcatergories', 'productId',productId)
    const { register } = useFormContext();
    useFieldArray({name: 'subCategories' });


    const onChangeHandler = (searchValue) => {
        let matches = []
        if (searchValue.length > 0) {
            matches = data.filter(subCategory => subCategory.subCategoryName.toLowerCase().includes(searchValue.toLowerCase()))
        }
        setSuggestions(matches)
        setSearchValue(searchValue)
    }

    const handleOnClick = (e) => {
        const categorySelected = data.filter(item => item.subCategoryName === e.target.value)[0];
        let newCheckedValues = selectedSubCategories.filter(item => item.subCategoryName !== categorySelected.subCategoryName);
        if (e.target.checked) {
            newCheckedValues.push(categorySelected)
        };
        setSelectedSubCategories(newCheckedValues);
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
                        data.map(subCategory => (
                            <Wrapper key={subCategory.subCategoryId}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                    <label>{subCategory.subCategoryName}</label>
                                    <input type="checkbox" 
                                        name={`subCategory${subCategory.subCategoryId}`}
                                        value={subCategory.subCategoryName}
                                        onClick={handleOnClick}
                                        {...register(`subCategories.${subCategory.subCategoryId}.name`)}
                                    />
                                </div>
                                {
                                  selectedSubCategories.some(item => item.subCategoryName === subCategory.subCategoryName) &&
                                   <SubProducts subCategoryId={subCategory.subCategoryId}/>
                                }
                            </Wrapper>
                    ))
                    )
                }
            </SubCategoriesWrapper>
            <Button><TiPlus/>ADD PRODUCTS</Button>
        </SubCategoriesContainer>
  )
}
