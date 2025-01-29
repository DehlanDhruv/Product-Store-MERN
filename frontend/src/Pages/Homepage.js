import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProductFromDB, updateProductInDB } from '../slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Homepage.css';
import { Heading} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from '@chakra-ui/react';


const Homepage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({}); 

  const dispatch = useDispatch();
  const productsArray = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateProductInDB(editedProduct));
    setIsEditing(false);
    setEditedProduct(null);
  };

  return (
    <div className="homepageContainer">
      <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>    
        HomePage
      </Heading>
      <div className="cardContainer">
        {productsArray &&
          productsArray.map((product) => (
            <div key={product._id} className="productCard">
              <img
                src={product.image}
                alt={product.name}
              />
              {isEditing && editedProduct?._id === product._id ? (
                <div className='inputFields'>
                  <input
                    type="text"
                    name="name"
                    maxLength={16} 
                    value={editedProduct.name}
                    placeholder="Name of the Product"
                    onChange={handleInputChange}
                  />
                  <input
                    type="float"
                    name="price"
                    value={editedProduct.price}
                    placeholder="Price of the Product"
                    onChange={handleInputChange}
                  />
                  <button className='saveButton' onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div className='cardInfo'>
                  <h1>{product.name}</h1>
                  <p>{product.price}</p>
                  <div className='buttons'>
                    <IconButton icon={<DeleteIcon />}
                      className="deleteButton"
                      size={'sm'}
                      onClick={() => {dispatch(deleteProductFromDB(product._id))}}
                      colorScheme='red'
                    />
                    <IconButton icon={<EditIcon />}
                      size={'sm'}
                      colorScheme='blue'
                      className="editButton"
                      onClick={() => handleEdit(product)}
                    />

                  </div>      
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Homepage;
