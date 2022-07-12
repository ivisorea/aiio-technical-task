import React from 'react'
import ReactDom from 'react-dom'
import { ModalContainer } from '../styles';

export const Modal = ({ children }) => {
  return ReactDom.createPortal(
    <ModalContainer>
        {children}
    </ModalContainer>,
    document.getElementById('modal')
  );
}
