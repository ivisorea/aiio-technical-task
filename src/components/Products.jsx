import { Button, ProductsContainer, HeaderTable, SubContainer, Article, Wrapper, ButtonWrapper, ArticleWrapper } from '../styles'
import { SubCategories } from './SubCategories'
import {TiPlus} from 'react-icons/ti'
import { useAppContext } from '../AppContext/appContext'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

export const Products = () => {
    const { products, loading } = useAppContext(true)
    const methods = useForm();
    const {register, handleSubmit} = methods;
    useFieldArray({
        control: methods.control,
        name: 'products',
    });

   const onSubmit = (data) => {
         const products = data.products.filter(product => product.name)
         const subCategories = data.subCategories.filter(subCategory => subCategory.name)
         const subProducts = data.subProducts.filter(subProduct => subProduct.name)
            console.log(products, subCategories, subProducts)
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
                                <Wrapper key={product.productId}>
                                    <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                                    <label>{product.productName}</label>
                                    <input type="checkbox" 
                                        name={`product${product.productId}`}
                                        value={product.productName}
                                        {...register(`products.${product.productId}.name`)}
                                    />
                                    </div>
                                    {
                                            <SubCategories productId={product.productId}/>
                                    }
                                </Wrapper>
                            ))
                        }
                    </SubContainer>
                    <Button> <TiPlus />ADD PRODUCTS</Button>
                </ProductsContainer>
            </form>
        </FormProvider>
    </>
  )
}
