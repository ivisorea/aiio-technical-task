import React from 'react'
import { useState} from 'react'
import { Button, 
        SubCategoriesContainer, 
        HeaderTable, 
        SubCategoriesWrapper, 
        Article, 
        WrapperSubCategories,  
        ButtonWrapper, 
        ArticleWrapper,
        InputContainer} from '../styles'
import { TiPlus } from 'react-icons/ti'
import { BsChevronDown } from 'react-icons/bs'
import { useFetchData } from '../utilities/hooks/useFetchData'
import { SubProducts } from './SubProducts'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Search } from './Search'

export const SubCategories = ({id}) => {
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const { data, loading } = useFetchData('http://localhost:8000/subcategories/', 'productId', id)
    const { register } = useFormContext();
    useFieldArray({name: 'subCategories' });

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
                    <Article>Select Subcategories</Article>
                </ArticleWrapper>
                <ButtonWrapper>
                   <BsChevronDown style={{color: 'white'}}/>
                </ButtonWrapper>
            </HeaderTable>
            <SubCategoriesWrapper>
                <Search
                    data={data}
                    params={'subcategoryName'}
                    setSuggestions={setSuggestions}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                    />
                {
                    suggestions.length > 0 ? (
                        suggestions.map(suggestion => (
                            <WrapperSubCategories key={suggestion.id}>
                                <InputContainer>
                                    <label>{suggestion.subcategoryName}</label>
                                    <input type="checkbox"
                                        name="subCategory"
                                        value={suggestion.subcategoryName}
                                    />
                                </InputContainer>
                            </WrapperSubCategories>
                        ))
                    ):(
                        loading ? <h1>Loading...</h1> :
                        data.map(subCategory => (
                            <WrapperSubCategories key={subCategory.id}>
                                <InputContainer>
                                    <label>{subCategory.subcategoryName}</label>
                                    <input type="checkbox" 
                                        name={`subcategory${subCategory.id}`}
                                        value={subCategory.subcategoryName}
                                        onClick={handleOnClick}
                                        {...register(`subCategories.${subCategory.id}.name`)}
                                    />
                                </InputContainer>
                                {
                                  selectedSubCategories.some(item => item.subcategoryName === subCategory.subcategoryName) &&
                                   <SubProducts id={subCategory.id}/>
                                }
                            </WrapperSubCategories>
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
