import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppState = ({children}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    
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
    
    return (
        <AppContext.Provider value={{products, loading}}>
        {children}
        </AppContext.Provider>
    )
    }
export default AppState