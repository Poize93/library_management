import  React,{useEffect, useState} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';


export default function Book(){
  const [book, setBook]=useState([])
  const navigate=useNavigate();
  const {id}=useParams();    

  useEffect( ()=>{
    (async() => {
      
      const  response= await axios.get(`https://62152ebccdb9d09717b0e6f5.mockapi.io/Library/${id}` );
     setBook(response.data) 
     console.log(response.data)
    }) ();
     
 },[]);



  // useEffect(async()=>{
   
  //          console.log(response.data,"checking my input")
  // },[])
  // const responseFunction = async ()=>{  
  //       const  response= await axios.get(`https://62152ebccdb9d09717b0e6f5.mockapi.io/Library/${id}` );
  //         setBook(response.data)
  //         console.log(response.data,"checking my input")
  //   };
  //   responseFunction();
  console.log(book)
  return(
    <>
    <div className="display">
    <Button onClick={() => navigate('/')} variant="contained">DashBoard</Button>
    <Button onClick={() => navigate('/books')}  variant="contained">Show Books</Button>
    <Button onClick={() => navigate('/create-book')} variant="contained">Create Books</Button>
        
    </div>  
    <div className="createView">
      <div>
   <table border="1px" solid>
     <thead>
       <tr>
         <td>Name</td>
         <td>Author</td>
         <td>ISBN</td>
         <td>Publsihed</td>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>{book.book_Name}</td>
         <td>{book.Author}</td>
         <td>{book.ISBN_Number}</td>
         <td>{book.Published}</td>
       </tr>
     </tbody>
   </table>
   </div>
   </div>
    </>
  )
  }