import React from 'react'
import { MdClose } from 'react-icons/md'

export const CloseButton = ({setOpen}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end' }}>
        <button 
            style={{backgroundColor: 'white', 
                    color: '#5774b6', 
                    fontWeight: 'bold', 
                    border: 'none', 
                 }}
            onClick={() => setOpen(false)}>
                <MdClose />
        </button>
        </div>
  )
}
