import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
    return createPortal(
        <>
            {isOpen && (
                <>
                    <div className='m-auto w-[350px] relative z-50 min-h-[200px] max-w-[80%] bg-white p-4'>
                        <div className='flex justify-end'>
                            <AiOutlineClose onClick={onClose}className='text-2xl' />
                        </div>
                        {children}
                    </div>
                    <div
                        onClick={onClose}
                        className='absolute top-0 h-screen w-screen backdrop-blur z-30' />
                </>
            )}
        </>
        , document.getElementById("modal-root"))
}

export default Modal
