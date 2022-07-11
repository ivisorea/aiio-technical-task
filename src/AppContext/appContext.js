import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppState = ({children}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([])
    
    useEffect(() => {
        setLoading(true)
        try{
        const fetchProducts = async () => {
            // const res = await fetch('http://localhost:8000/products/')
            const res = await fetch('http://localhost:3001/products')
            const data = await res.json()
            console.log(data)
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
        } catch (error) {
        console.log(error)
        }
    }, [])


    return (
        <AppContext.Provider value={
            {products, 
            loading, 
            openModal, 
            setOpenModal, 
            selectedProducts, 
            setSelectedProducts}}>
        {children}
        </AppContext.Provider>
    )
    }
export default AppState