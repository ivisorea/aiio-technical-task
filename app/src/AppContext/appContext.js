import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppState = ({children}) => {
    const [products, setProducts] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedSubCategoriesGlobal, setSelectedSubCategoriesGlobal] = useState([])
    
    useEffect(() => {
        setLoading(true)
        try{
        const fetchProducts = async () => {
            const res = await fetch('http://localhost:8000/products/')
            const data = await res.json()
            setProducts(data.results)
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
            const res = await fetch('http://localhost:8000/subcategories/')
            const data = await res.json()
            setSubCategories(data.results)
            setLoading(false)
        }
        fetchProducts()
        } catch (error) {
        console.log(error)
        }
    }, [])


    const postData = async(url, data) => {
        try{
            await fetch(url,{
                method:'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch(e){
                console.log(e)
            }
    }

    return (
        <AppContext.Provider value={
            {products, 
            loading, 
            postData,
            openModal, 
            setOpenModal, 
            subCategories,
            selectedSubCategoriesGlobal,
            setSelectedSubCategoriesGlobal
            }}>
        {children}
        </AppContext.Provider>
    )
    }
export default AppState