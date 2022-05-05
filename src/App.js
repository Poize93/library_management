import  React,{useState } from 'react';
import {useParams} from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
 } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Dashboard from './Dashboard'
import Books from './Books'
import CreateBook from './CreateBook';
import Book from './Book';
import Delete from './Delete';
import Edit_Book from './Edit_Book';

export default function RouterComponent() {
  const [library, setLibrary]=useState([]);
  const [book, setBook]=useState([])
  const [bookGet,setbookGet]=useState(0)
  const [editBook , setEditBook]=useState(0)
  fetchBooks();
return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/books" element={<Books library={library} setLibrary={setLibrary} />}></Route>
          <Route path="/create-book" element={<CreateBook library={library} setLibrary={setLibrary}/>}></Route>
          <Route path='/book/:id' element={<Book/>}></Route>
          <Route path='/book_edit/:id' element={<Edit_Book library={library} setLibrary={setLibrary}/>}></Route>
          <Route path='/delete/:id' element={<Delete library={library} setLibrary={setLibrary} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );


  function fetchBooks(){
    if(bookGet===0){
      const responseFunction = async ()=>{  
        const  response= await axios.get('https://62152ebccdb9d09717b0e6f5.mockapi.io/Library' );
        setLibrary(response.data)
        };
        responseFunction();
        setbookGet(1)
    }
  }
}


