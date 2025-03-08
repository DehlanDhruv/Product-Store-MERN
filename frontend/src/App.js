import './App.css';
import { Box, useColorModeValue} from '@chakra-ui/react';
import {Routes , Route} from 'react-router-dom';
import HomePage from './Pages/Homepage.js';
import Navbar from './Components/Navbar';
import CreatePage from './Pages/Createpage.js';

function App() {
  return (
    <Box bg={useColorModeValue("gray.100" , "gray.900")} >
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/createPage' element={<CreatePage/>} />
      </Routes>
    </Box>
  );
}

export default App;
