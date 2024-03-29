import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoTrashBin } from 'react-icons/io5'
import { db } from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclouse from '../hooks/useDisclouse'
import { toast } from 'react-toastify'

const ContactCard = ({ contact }) => {

    const {isOpen, onClose, onOpen} = useDisclouse()

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            toast.success("Contact deleted successfully")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div key={contact.id} className="bg-yellow flex justify-between items-center rounded-lg p-2">
                <div className="flex gap-1 items-center ">
                    <HiOutlineUserCircle className="text-orange text-4xl" />
                    <div className="">
                        <h2 className="font-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex text-2xl gap-1">
                    <FaUserEdit onClick={onOpen} className='cursor-pointer'/>
                    <IoTrashBin onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer" />
                </div>
            </div>
            <AddAndUpdateContact 
            contact={contact} 
            isUpdate 
            isOpen={isOpen} 
            onClose={onClose}
            />
        </>
    )
}

export default ContactCard
