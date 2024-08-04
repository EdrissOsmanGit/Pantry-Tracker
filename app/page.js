'use client'

import Image from "next/image";
import {useState, useEffect} from 'react'
import {collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {firestore} from '@/firebase'
import {Box, Typography, Modal} from '@mui/material'


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState([true])
  const [itemnate, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data()
      await setDoc ( docRef, {count: count + 1})
    } else {
      await setDoc(docRef, {count: 1})
    }
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc ( docRef, {count: count - 1})
      }

    }
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box width= "100%" height = "100vh" display="flex" justifyContent="center">
      <Typography variant="h1" >Inventory</Typography>
      
      <Modal open={open} onCLose={handleClose}>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" display="flex" >

        </Box>
      </Modal>

      
    </Box>
  )
}
