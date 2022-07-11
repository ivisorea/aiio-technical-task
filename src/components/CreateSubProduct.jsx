import React from 'react'
import { useForm } from 'react-hook-form'
import AppState, { useAppContext } from '../AppContext/appContext'
import { Button } from '../styles'

export const CreateSubProduct = ({setOpen}) => {
    const { products, subCategories} = useAppContext(AppState)
    const { register, 
        handleSubmit: handleSubmit2,
        reset } = useForm()
    
    const onSubmit = (data) => {
        reset()
        console.log('data', data)
        setOpen(false)
    }
    
  return (
    <div>
        <h3>Create Sub Product</h3>
            <form onSubmit={handleSubmit2(onSubmit)}>
                <label>SubProduct Name
                <input {...register('subProductName', { required: true })} />
                </label>
                <select {...register('productId', { required: true })}>
                    <option value=''>Select Product</option>
                    {products.map(product => (
                        <option key={product.productId} value={product.productId}>{product.productName}</option>
                    ))}
                </select>
                <select {...register('subCategoryId', { required: true })}>
                    <option value=''>Select Subcategory</option>
                    {subCategories.map(subCategory => (
                        <option key={subCategory.subCategoryId} value={subCategory.subCategoryId}>{subCategory.subCategoryName}</option>
                    ))}
                </select>
                <Button type='submit'>Submit</Button>
            </form>

    </div>
  )
}