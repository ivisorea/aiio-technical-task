import React from 'react'
import AppState, { useAppContext } from '../AppContext/appContext'

export const SelectionOverview = ({selectedData}) => {
    const { setOpenModal } = useAppContext(AppState)
    const handleOnClickSave = () => {
        setOpenModal(false)
    }
  return (
    <>
        <h3>Products</h3>
        <p>{selectedData.products.filter(product => product.name).map(product => product.name).join(', ')}</p>
        
        <h3>Sub categories</h3>
        <p>{selectedData.subCategories.filter(subCategory => subCategory.name).map(subCategory => subCategory.name).join(', ')}</p>
        
        <h3>Sub products</h3>
        <p>{selectedData.subProducts.filter(subProduct => subProduct.name).map(subProduct => subProduct.name).join(', ')}</p>

        <div style={{display: 'flex', justifyContent: 'flex-end' }}>

        <button 
            style={{backgroundColor: 'white', color: '#5774b6', fontWeight: 'bold', border: 'none', marginTop: '1rem', }}
            onClick={handleOnClickSave}>
                SAVE
        </button>
        </div>
    </>
  )
}
