import { Button, ProductsContainer, HeaderTable, SubContainer, Article, Wrapper, ButtonWrapper, ArticleWrapper, InputContainer } from '../styles'
import { SubCategories } from './SubCategories'
import {TiPlus} from 'react-icons/ti'
import AppState, { useAppContext } from '../AppContext/appContext'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Modal } from './Modal';
import { useState } from 'react'
import { SelectionOverview } from './SelectionOverview'


export const Products = () => {
    const { products, loading, setOpenModal, openModal} = useAppContext(AppState)
    const methods = useForm();
    const {register, handleSubmit, reset} = methods;
    useFieldArray({
        control: methods.control,
        name: 'products',
    });
    const [selectedData, setSelectedData] = useState({})
    const [selectedProducts, setSelectedProducts] = useState([])
    const onSubmit = (data) => {
        setSelectedData(data)
        setOpenModal(true)
        reset()
    }

    const handleOnClick = (e) => {
        const productSelected = products.filter(item => item.productName === e.target.value)[0];
        let newCheckedValues = selectedProducts.filter(item => item.productName !== productSelected.productName);
        if (e.target.checked) {
            newCheckedValues.push(productSelected)
        };
        setSelectedProducts(newCheckedValues);
    }

  return (
    <>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProductsContainer>
                    <HeaderTable>
                        <ArticleWrapper>
                            <Article>Products</Article>
                        </ArticleWrapper>
                        <ButtonWrapper>
                            <Button type='submit'>DONE</Button>
                        </ButtonWrapper>
                    </HeaderTable>
                    <SubContainer>
                        {loading ? <h1>Loading...</h1> :
                            products.map(product => (
                                <Wrapper key={product.id}>
                                    <InputContainer>
                                        <label>{product.productName}</label>
                                        <input 
                                            type="checkbox" 
                                            name={`product${product.id}`}
                                            value={product.productName}
                                            onClick={handleOnClick}
                                            {...register(`products.${product.id}.name`)}
                                        />
                                    </InputContainer>
                                    {
                                        selectedProducts.some(item => item.id === product.id) && <SubCategories id={product.id}/>
                                    }
                                </Wrapper>
                            ))
                        }
                    </SubContainer>
                    <Button
                        type='button'
                        onClick={(e) => e.preventDefault()}
                    > <TiPlus />ADD PRODUCTS</Button>
        </ProductsContainer>
            </form>
        </FormProvider>
        {
            !!openModal && 
                <Modal>
                    <SelectionOverview 
                        selectedData={selectedData}
                        selectedProducts={selectedProducts}
                        />
                </Modal>
        }
            
    </>
  )
}
