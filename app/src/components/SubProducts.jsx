import React from 'react'
import { useState} from 'react'
import { Button, 
        SubProductsContainer, 
        HeaderTable, 
        SubProductsWrapper, 
        Article, 
        WrapperSubProducts, 
        ButtonWrapper, 
        CheckboxContainer,
        ArticleWrapper,
        InputContainer, 
        } from '../styles'
import { TiPlus } from 'react-icons/ti'
import { BsChevronDown } from 'react-icons/bs'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useFetchData } from '../utilities/hooks/useFetchData'
import { Modal } from './Modal'
import { CreateSubProduct } from './CreateSubProduct'
import { Search } from './Search'

export const SubProducts = ({id}) => {
    const [open, setOpen] = useState(false)
    const [categorySelected, setCategorySelected] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { data, loading } = useFetchData('http://localhost:8000/subproducts/', 'subcategoryId', id)
    const { register } = useFormContext();
    useFieldArray({name: 'subCategories' });
    
    const handleOnClickAddProduct = (e) => {
        e.preventDefault()
        setCategorySelected();
        console.log('categorySelected', categorySelected)
        setOpen(true)
    }
  return (
    <>
        <SubProductsContainer>
            <HeaderTable>
                <ArticleWrapper>
                    <Article>Select subproducts</Article>
                </ArticleWrapper>
                <ButtonWrapper>
                   <BsChevronDown style={{color: 'white'}}/>
                </ButtonWrapper>
            </HeaderTable>
            <SubProductsWrapper>
                <Search
                    data={data}
                    key={'subproductName'}
                    setSuggestions={setSuggestions}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                />
                {
                    suggestions.length > 0 ? (
                        suggestions.map(suggestion => (
                            <WrapperSubProducts key={suggestion.id}>
                                <InputContainer>
                                <label>{suggestion.subproductName}</label>
                                <input type="checkbox"
                                    name="subProduct"
                                    value={suggestion.subproductName}
                                />
                                </InputContainer>
                            </WrapperSubProducts>
                        ))
                    ):(
                        loading ? <h1>Loading...</h1> :
                        data.map(subProduct => (
                            <WrapperSubProducts key={subProduct.id}>
                                <InputContainer>
                                    <label>{subProduct.subproductName}</label>
                                    <CheckboxContainer styled={{backgroundColor: 'red'}}>
                                    <input type="checkbox" 
                                        name={`subproduct${subProduct.id}`}
                                        value={subProduct.subproductName}
                                        {...register(`subProducts.${subProduct.id}.name`)}
                                    />
                                    </CheckboxContainer>
                                </InputContainer>
                            </WrapperSubProducts>
                    ))
                    )
                }
            </SubProductsWrapper>
            <Button
                type='button'
                onClick={handleOnClickAddProduct}>
            <TiPlus/>ADD SUBPRODUCT</Button>
        </SubProductsContainer>
        {
            !!open && 
                <Modal>
                    <CreateSubProduct 
                        setOpen={setOpen}
                        />
                </Modal>
        }
    </>
    
  )
}
