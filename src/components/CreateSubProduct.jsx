import React from 'react'
import { useForm } from 'react-hook-form'
import AppState, { useAppContext } from '../AppContext/appContext'
import { Button } from '../styles'

export const CreateSubProduct = ({setOpen}) => {
    const {subCategories} = useAppContext(AppState)
    const { register, 
        handleSubmit: handleSubmitSubProduct,
        reset } = useForm()
    
    const onSubmitSubProduct = async (data) => {
        
        try{
            let result = await fetch('http://localhost:8000/subproducts/',{
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
        reset()
        setOpen(false)
    }
  return (
    <div>
        <button onClick={() => setOpen(false)}>x</button>
        <h3>Create Sub Product</h3>
            <form>
                <label>SubProduct Name
                <input {...register('subproductName', { required: true })} />
                </label>
                <select {...register('subcategoryId', { required: true })}>
                    <option value=''>Select Subcategory</option>
                    {subCategories.map(subCategory => (
                        <option key={subCategory.id} value={subCategory.id}>{subCategory.subcategoryName}</option>
                    ))}
                </select>
                <Button 
                onClick={handleSubmitSubProduct(onSubmitSubProduct)}
                >Submit</Button>
            </form>
    </div>
  )
}