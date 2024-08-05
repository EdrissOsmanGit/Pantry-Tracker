'use client'

import Image from "next/image";
import {useState, useEffect} from 'react'
import {collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {firestore} from '@/firebase'
import { Box, Typography, Modal, Stack, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Translate } from "@mui/icons-material";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

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

    await updateInventory();
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

    await updateInventory();
  }

  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      
      await deleteDoc(docRef)

    }

    await updateInventory();
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box width= "100%" height = "100vh" display="flex" flexDirection="column" alignItems="center" gap={3} >
      <Typography variant="h1">Pantry Tracker</Typography>
      
      <Modal open={open} onClose={handleClose}>
        <Box position="absolute" top="50%" left="50%" width={400} padding={4} bgcolor="white" borderRadius="15px" allignContent="center" display="flex" flexDirection="column" gap={3} sx = {{ transform: 'translate(-50%, -50%)'}}>
          <Typography variant="h6">New Item</Typography>
            
          <Stack width="100%"  spaceing={2} display="flex" flexDirection="row">
            <TextField fullWidth value={itemName} onChange={(e) => {
              setItemName(e.target.value)
            }}/>

            <Button onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
            
          </Stack>
        </Box>
      </Modal>

      
        <Stack minWidth="400px" width="60%" height="450px" boxShadow={5} borderRadius="35px" display="flex" flexDirection="column" alignItems="center" overflow="auto">
          {inventory.map(({name, count}) => (
            <Box 
              key={name}
              width="100%"
              minHight="150px"
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              padding={2}
            > 

              <Stack  width="100%" height="60px" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" boxShadow={5} borderRadius="15px" padding={2}>
                <Box display="flex" alignItems="center">
                  <IconButton aria-label="delete" onClick = {() => {
                    deleteItem(name)
                  }}><DeleteIcon/></IconButton>
                  <Typography> {name} </Typography>
                  
                </Box>
                
                <Box display="flex" alignItems="center" gap={3}>
                  <Button onClick ={() => {
                    addItem(name)
                  }}> Add</Button>

                  <Button onClick ={() => {
                    removeItem(name)
                  }}> Remove</Button>
                  <Typography>{count}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Button variant="contained" onClick = {() => {
              handleOpen()
            }}
        >Add New Item</Button>
            
      </Box>

  
  )
}
