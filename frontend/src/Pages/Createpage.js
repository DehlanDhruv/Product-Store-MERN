import { Container, useColorModeValue, VStack  ,Input, Heading , Box , Button} from '@chakra-ui/react'
import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { addProductToDB } from '../slice/productSlice'

const Createpage = () => {
    const dispatch = useDispatch();
    

    const [newProduct , setNewProduct] = useState({
        name: '',
        price:'',
        image:''
    })

    const handleAddProduct = async (e) =>{
        e.preventDefault();
        if(!newProduct.name || !newProduct.price){
            alert('Name and Price are Compulsory fields')
            return
        }
        else{
        console.log(newProduct)
        dispatch(addProductToDB(newProduct))
        setNewProduct({name:'',price:'',image:''})}
    }

    
     
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>    
                Create New Product
            </Heading>
            <Box
                w={'full'} bg={useColorModeValue('white' , 'gray.800')} p={6} rounded={'lg'} shadow={'md'}
            >
                <VStack spacing={4}>
                    <Input 
                        placeholder = 'Product Name'
                        name='name'
                        required
                        value={newProduct.name}    
                        onChange={(e) => setNewProduct({...newProduct , name: e.target.value})}                
                    />

                    <Input 
                        placeholder = 'Price'
                        name='name'
                        required
                        value={newProduct.price}    
                        onChange={(e) => setNewProduct({...newProduct , price: e.target.value})}                
                    />

                    <Input 
                        placeholder = 'Image'
                        name='name'
                        value={newProduct.image}    
                        onChange={(e) => setNewProduct({...newProduct , image: e.target.value})}                
                    />

                    <Button type='submit' colorScheme= 'blue' onClick={handleAddProduct} w='full'>
                        Add Product
                    </Button>
                </VStack>

            </Box>
        </VStack>

    </Container>
  )
}

export default Createpage