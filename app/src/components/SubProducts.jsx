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
import { Modal } from './Modal'
import { CreateSubProduct } from './CreateSubProduct'

export const SubProducts = ({id}) => {
    const [open, setOpen] = useState(false)
    const [categorySelected, setCategorySelected] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { data, loading } = useFetchData('http://localhost:8000/subproducts/', 'subcategoryId', id)
    const { register } = useFormContext();
    useFieldArray({name: 'subCategories' });
    
    const onChangeHandler = (searchValue) => {
        let matches = []
        if (searchValue.length > 0) {
            matches = data.filter(subProduct => subProduct.subproductName.toLowerCase().includes(searchValue.toLowerCase()))
        }
        setSuggestions(matches)
        setSearchValue(searchValue)
    }
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
                                <label>{suggestion.subproductName}</label>
                                <input type="checkbox"
                                    name="subProduct"
                                    value={suggestion.subproductName}
                                />
                                </div>
                            </Wrapper>
                        ))
                    ):(
                        loading ? <h1>Loading...</h1> :
                        data.map(subProduct => (
                            <Wrapper key={subProduct.id}>
                                <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                    <label>{subProduct.subproductName}</label>
                                    <input type="checkbox" 
                                        name={`subproduct${subProduct.id}`}
                                        value={subProduct.subproductName}
                                        {...register(`subProducts.${subProduct.id}.name`)}
                                    />
                                </div>
                            </Wrapper>
                    ))
                    )
                }
            </SubCategoriesWrapper>
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
