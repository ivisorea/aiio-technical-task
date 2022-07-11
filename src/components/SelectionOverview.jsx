import React from 'react'
import AppState, { useAppContext } from '../AppContext/appContext'

export const SelectionOverview = ({selectedData}) => {
    const { setOpenModal } = useAppContext(AppState)
  return (
    <>
        <h3>Products</h3>
        {selectedData.products.some(item => item.name !== false) ?
        <p>{selectedData.products.filter(product => product.name).map(product => product.name).join(', ')}</p>
        : <p>No products selected</p>}
        <h3>Sub categories</h3>
        {selectedData.subCategories.some(item => item.name !== false) ?
        <p>{selectedData.subCategories.filter(subCategory => subCategory.name).map(subCategory => subCategory.name).join(', ')}</p>
        : <p>No sub categories selected</p>}
        <h3>Sub products</h3>
        {selectedData.subProducts.some(item => item.name !== false) ?
        <p>{selectedData.subProducts.filter(subProduct => subProduct.name).map(subProduct => subProduct.name).join(', ')}</p>
        : <p>No sub products selected</p>}
        <div style={{display: 'flex', justifyContent: 'flex-end' }}>
        <button 
            style={{backgroundColor: 'white', color: '#5774b6', fontWeight: 'bold', border: 'none', marginTop: '1rem', }}
            onClick={() => setOpenModal(false)}>
                SAVE
        </button>
        </div>
    </>
  )
}
