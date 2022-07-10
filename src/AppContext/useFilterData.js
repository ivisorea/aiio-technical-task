import { useEffect, useState } from "react"

export const useFilterData = (url, option) => {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState(true)
   
    useEffect(() => {
        setLoading(true)
        try {
            const fetchData = async () => {
                const res = await fetch(url)
                const data = await res.json()
                const filteredData = data.filter(item => item.productId === option)
                setData(filteredData)
                setLoading(false)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [option, url])

    return { data, loading }
}
