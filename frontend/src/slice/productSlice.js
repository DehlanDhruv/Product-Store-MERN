import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async Thunks
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('api/products');
  return response.data.data; // Assumes response contains product list
});

export const addProductToDB = createAsyncThunk('product/addProduct', async (newProduct) => {
  const response = await axios.post('api/products', newProduct);
  return response.data.data; // Assumes response contains the added product
});

export const updateProductInDB = createAsyncThunk('product/updateProduct', async (updatedProduct) => {
  const response = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct);
  return response.data ; // Assumes response contains the updated product
});

export const deleteProductFromDB = createAsyncThunk('product/deleteProduct', async (productId) => {
  await axios.delete(`/api/products/${productId}`);
  return productId; // Return the ID of the deleted product
});

// Initial state
const initialState = {
  products: [],
  status: 'idle', 
  error: null,
};

// Slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; 
      })
      // Add product
      .addCase(addProductToDB.fulfilled, (state, action) => {
        state.products.push(action.payload); 
      })
      // Update product
      .addCase(updateProductInDB.fulfilled, (state, action) => {
        console.log(action.payload)
        const index = state.products.findIndex((p) => p._id === action.payload.data._id);
        console.log(index)
        if (index !== -1) {
          state.products[index] = action.payload.data; 
        }

        console.log( JSON.parse(JSON.stringify(state.products)))
      
      })
      // Delete product
      .addCase(deleteProductFromDB.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
        
      });
  },
});

export default productSlice.reducer;







































// import { createSlice } from '@reduxjs/toolkit';

// const initialState = [];

// export const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     addProduct: (state, action) => {
//       state.push(action.payload); 
//     },
//     removeProduct: (state, action) => {
//       return state.filter((product) => product.name !== action.payload.name);
//     },
//   },
// });

// export const { addProduct, removeProduct } = productSlice.actions;

// export default productSlice.reducer;
