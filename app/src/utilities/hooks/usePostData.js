import {  useState } from "react"

export const usePostData = (url, data) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => setResponse(res))
        .catch(err => setError(err))
   
    return {response, error}
}