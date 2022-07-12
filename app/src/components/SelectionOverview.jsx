import React from 'react'
import AppState, { useAppContext } from '../AppContext/appContext'
import { CloseButton } from './CloseButton'

export const SelectionOverview = ({selectedData, selectedProducts}) => {
    const { setOpenModal } = useAppContext(AppState)
    const handleOnClickSave = () => {
        setOpenModal(false)
    }

  return (
    <>
        <CloseButton setOpen={setOpenModal}/>
        <h3>Products</h3>
        {selectedProducts.length > 0 ?
        <p>{selectedData.products.filter(product => product.name).map(product => product.name).join(', ')}</p>
        : <p>No products selected</p>}

        <h3>Sub categories</h3>
        {selectedData.subCategories === undefined
        ? <p>No sub categories selected</p> :
        <p>{selectedData.subCategories.filter(subCategory => subCategory.name).map(subCategory => subCategory.name).join(', ')}</p>
        }
        
        <h3>Sub products</h3>
        {selectedData.subProducts === undefined ? <p>No sub products selected</p> :
        <p>{selectedData.subProducts.filter(subProduct => subProduct.name).map(subProduct => subProduct.name).join(', ')}</p>}

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
