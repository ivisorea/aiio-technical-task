import React from 'react'
import { Button, ProductsContainer, HeaderTable, SubContainer, Article, Wrapper, ButtonWrapper, ArticleWrapper } from '../styles'
import { SubCategories } from './SubCategories'
import {TiPlus} from 'react-icons/ti'
import { useAppContext } from '../AppContext/appContext'

export const Products = () => {
    const { products, loading } = useAppContext()
  return (
    <>
        <ProductsContainer>
            <HeaderTable>
                <ArticleWrapper>
                    <Article>Products</Article>
                </ArticleWrapper>
                <ButtonWrapper>
                    <Button>DONE</Button>
                </ButtonWrapper>
            </HeaderTable>
            <SubContainer>
                {loading ? <h1>Loading...</h1> :
                    products.map(product => (
                        <Wrapper key={product.productId}>
                            <div style={{display : 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '0.4rem'}}>
                            <label>{product.productName}</label>
                            <input type="checkbox" 
                                name="product"
                                value={product.productName}
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
        
    </>
  )
}
