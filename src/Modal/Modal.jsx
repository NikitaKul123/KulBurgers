import React from 'react'
import './modal.css'

const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? "modal1 active" : "modal1"} onClick={() => setActive(false)}>
      <div className={active ? "modal1_content active" : "modal1_content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
