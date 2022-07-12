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

export const SubCategories = ({id}) => {
    
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const { data, loading } = useFetchData('http://localhost:8000/subcategories/', 'productId', id)
    const { register } = useFormContext();
    useFieldArray({name: 'subCategories' });


    const onChangeHandler = (searchValue) => {
        let matches = []
        if (searchValue.length > 0) {
            matches = data.filter(subCategory => subCategory.subcategoryName.toLowerCase().includes(searchValue.toLowerCase()))
        }
        setSuggestions(matches)
        setSearchValue(searchValue)
    }

    const handleOnClick = (e) => {
        const categorySelected = data.filter(item => item.subcategoryName === e.target.value)[0];
        let newCheckedValues = selectedSubCategories.filter(item => item.subcategoryName !== categorySelected.subcategoryName);
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
                            <Wrapper key={suggestion.id}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                <label>{suggestion.subcategoryName}</label>
                                <input type="checkbox"
                                    name="subCategory"
                                    value={suggestion.subcategoryName}
                                />
                                </div>
                            </Wrapper>
                        ))
                    ):(
                        loading ? <h1>Loading...</h1> :
                        data.map(subCategory => (
                            <Wrapper key={subCategory.id}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                    <label>{subCategory.subcategoryName}</label>
                                    <input type="checkbox" 
                                        name={`subcategory${subCategory.id}`}
                                        value={subCategory.subcategoryName}
                                        onClick={handleOnClick}
                                        {...register(`subCategories.${subCategory.id}.name`)}
                                    />
                                </div>
                                {
                                  selectedSubCategories.some(item => item.subcategoryName === subCategory.subcategoryName) &&
                                   <SubProducts id={subCategory.id}/>
                                }
                            </Wrapper>
                    ))
                    )
                }
            </SubCategoriesWrapper>
            <Button
                type='button'
                onClick={(e) => e.preventDefault()}
            ><TiPlus/>ADD SUBCATEGORY</Button>
        </SubCategoriesContainer>
  )
}
