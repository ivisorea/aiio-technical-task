import { useEffect, useState } from "react"

export const useFetchData = (url, key, value) => {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState(true)
   
    useEffect(() => {
        setLoading(true)
        try {
            const fetchData = async () => {
                const res = await fetch(url)
                const data = await res.json()
                const filteredData = data.filter(item => item[key] === value)
                setData(filteredData)
                setLoading(false)
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [value, url,key])

    return { data, loading }
}
