import React, { cloneElement } from 'react'
import Modal from './Modal'
import { Formik, Form, Field } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact)
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact)
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                    initialValues={isUpdate
                        ? {
                            name: contact.name,
                            email: contact.email
                        } :
                        {
                            name: "",
                            email: ""
                        }}
                    onSubmit={(values) => {
                        onClose();
                        { isUpdate ? updateContact(values, contact.id) : addContact(values) }
                    }}
                >
                    <Form className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name">Name</label>
                            <Field name="name" className="border h-10 px-2" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="border h-10 px-2" />
                        </div>
                        <button type='submit' className='bg-amber-500 px-3 py-1.5 border rounded-md self-end hover:bg-amber-600'>
                            {isUpdate ? "Update" : "Add"} contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default AddAndUpdateContact
