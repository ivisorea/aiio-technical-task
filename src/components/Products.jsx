import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, ProductsContainer, HeaderTable, SubContainer, Article, Wrapper, ButtonWrapper, ArticleWrapper } from '../styles'


export const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            fetch('http://localhost:3001/products')
                .then(res => res.json())
                .then(data => {
                    setProducts(data)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

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
                            <p>{product.productName}</p>
                            <input type="checkbox" 
                                name="product"
                                value={product.productId}
                                onChange={() => {
                                    console.log(product.productId)
                                }
                                }
                            />
                        </Wrapper>
                    ))
                }
            </SubContainer>
            <Button>ADD PRODUCTS</Button>
        </ProductsContainer>
        
    </>
  )
}
