import React from 'react'
import AppState, { useAppContext } from '../AppContext/appContext'
import { CloseButton } from './CloseButton'

export const SelectionOverview = ({selectedData, selectedProducts}) => {
    const { setOpenModal, subProducts } = useAppContext(AppState)
    
    const subProductsIds = selectedData.subProducts.filter(subProduct => subProduct.subproductId).map(subProduct => parseInt(subProduct.subproductId))
    const subProductsSelected = subProducts.filter(subProduct => subProductsIds.includes(subProduct.id))
    
    const handleOnClickSave = () => {
      const newsubProductsSelected = subProductsSelected.map(subProduct => ({subproductId: subProduct.id}))
      for (let i = 0; i < newsubProductsSelected.length; i++) {
        try{
          fetch('http://localhost:8000/selected-subproducts/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newsubProductsSelected[i])
          })
          setOpenModal(false)
        }
        catch(e){
          console.log(e)
        }
      }
    }
     
  return (
    <>
      <CloseButton setOpen={setOpenModal}/>
      <h3>Products</h3>
      {selectedProducts.length > 0 &&
      <p>{selectedData.products.filter(product => product.name).map(product => product.name).join(', ')}</p>}

      <h3>Sub categories</h3>
      {selectedData.subCategories !== undefined &&
      <p>{selectedData.subCategories.filter(subCategory => subCategory.name).map(subCategory => subCategory.name).join(', ')}</p>
      }
      
      <h3>Sub products</h3>
      {selectedData.subProducts !== undefined &&
      <p>{subProductsSelected.map(subProduct => subProduct.subproductName).join(', ')}</p>}

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
