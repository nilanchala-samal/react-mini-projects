import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'

import Navbar from "./components/Navbar"
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

import useDisclouse from "./hooks/useDisclouse";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [contacts, setContacts] = useState([])
  const { isOpen, onClose, onOpen } = useDisclouse()


  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")
        // const contactsSnapshot = await getDocs(contactsRef)
        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setContacts(contactList);
          return contactList;
        })

      } catch (error) {
        console.log(error)
      }

    }
    getContacts();
  }, [])

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FaSearch className="text-white text-2xl absolute ml-2" />
            <input type="text" className=" flex-grow border bg-transparent rounded-md h-10 border-white text-white pl-10" />
          </div>
          <FaPlusCircle
            className="text-4xl text-white cursor-pointer"
            onClick={onOpen}
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App
