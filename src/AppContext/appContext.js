import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppState = ({children}) => {
    const [products, setProducts] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectedSubCategoriesGlobal, setSelectedSubCategoriesGlobal] = useState([])
    
    useEffect(() => {
        setLoading(true)
        try{
        const fetchProducts = async () => {
            const res = await fetch('http://localhost:3001/products')
            const data = await res.json()
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
        } catch (error) {
        console.log(error)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        try{
        const fetchProducts = async () => {
            const res = await fetch('http://localhost:3002/subcatergories')
            const data = await res.json()
            setSubCategories(data)
            setLoading(false)
        }
        fetchProducts()
        } catch (error) {
        console.log(error)
        }
    }, [])

    const getSelectedProducts = (e) => {
        const productSelected = products.filter(item => item.productName === e.target.value)[0];
        let newCheckedValues = selectedProducts.filter(item => item.productName !== productSelected.productName);
        if (e.target.checked) {
            newCheckedValues.push(productSelected)
        };
        setSelectedProducts(newCheckedValues);
    }

    return (
        <AppContext.Provider value={
            {products, 
            loading, 
            openModal, 
            setOpenModal, 
            subCategories,
            selectedProducts, 
            getSelectedProducts,
            selectedSubCategoriesGlobal,
            setSelectedSubCategoriesGlobal
            }}>
        {children}
        </AppContext.Provider>
    )
    }
export default AppState