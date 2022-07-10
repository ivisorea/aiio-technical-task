import styled from "styled-components";

export const Button = styled.button`
    background-color: #dedede;
    border: none;
    border-radius: 2px;
    padding: .5rem .8rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`;

export const HeaderTable = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 0 .2rem 0rem;
    width: 100%;
`

export const ProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #00a9d5;
    padding: 1rem;
`
export const SubContainer = styled.div`
    background-color: white;
    border: 5px solid #e9e7e7;
    width: 100%;
    margin-bottom: .4rem;
    display: flex;
    flex-direction: column;
    align-items: center;

`
export const Article = styled.article`
    font-size: 1.2rem;
    color: white;
`
export const ArticleWrapper = styled.div`
    display: flex;
    flex: 4;
    justify-content: center;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: .4rem;
    width: 100%;
`
export const SubCategoriesContainer = styled(ProductsContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #34464d;
    padding: 1rem;
`
export const SubCategoriesWrapper = styled(SubContainer)`
    background-color: #dedede;
`
export const SubProductsContainer = styled(SubCategoriesContainer)`
    background-color: #9c9c9c;
`
export const ModalContainer = styled.div`
    background-color: #fdfdfd;
    border-radius: 3px;
    box-shadow: 0px 5px 50px rgba(189, 191, 195, 0.25);
    padding: 1.5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;
`