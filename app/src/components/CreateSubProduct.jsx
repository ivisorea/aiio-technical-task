import React from 'react'
import { useForm } from 'react-hook-form'
import AppState, { useAppContext } from '../AppContext/appContext'
import { Button } from '../styles'
import { CloseButton } from './CloseButton'

export const CreateSubProduct = ({setOpen}) => {
    const {subCategories, postData} = useAppContext(AppState)
    const { register, 
        handleSubmit: handleSubmitSubProduct,
        reset } = useForm()
    const onSubmitSubProduct = async (data) => {
    const url = 'http://localhost:8000/subproducts/'
    postData(url, data)
    
        reset()
        setOpen(false)
    }
      
  return (
    <div>
        <CloseButton setOpen={setOpen}/>
        <h3>Create Sub Product</h3>
            <form>
                <div style={{display: 'flex', flexDirection: 'column' }}>
                    <div style={{display: 'flex', flexDirection: 'column', margin: '.5rem'}}>
                        <label>SubProduct Name</label>
                        <input {...register('subproductName', { required: true })} />
                    </div>

                    <select 
                        style={{margin: '.5rem'}}
                        {...register('subcategoryId', { required: true })}>
                        <option value=''>Select Subcategory</option>
                        {subCategories.map(subCategory => (
                            <option key={subCategory.id} value={subCategory.id}>{subCategory.subcategoryName}</option>
                        ))}
                    </select>
                    <Button 
                        onClick={handleSubmitSubProduct(onSubmitSubProduct)}>
                        SUBMIT
                    </Button>
                </div>
            </form>
    </div>
  )
}