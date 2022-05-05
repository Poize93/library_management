import  React,{useState} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Delete(props){
  const library=props.library
  const setLibrary=props.setLibrary
  const navigate=useNavigate();
  var updateLibrary=[]
  const {id}=useParams();
  
  const responseFunction = async ()=>{  
    
    const  response= await axios.delete(`https://62152ebccdb9d09717b0e6f5.mockapi.io/Library/${id}` );
  
    var updatedLibrary = library.filter((library) => library.id !== id);
    console.log(updatedLibrary,"after delete");
    console.log(library,"Library after delete")
    setLibrary(updatedLibrary );
    // console.log(response.data,"Deleted book")
  };
  responseFunction();

  return(
    <>
    <div className="display">
    <Button onClick={() => navigate('/')} variant="contained">DashBoard</Button>
    <Button onClick={() => navigate('/books')}  variant="contained">Show Books</Button>
    <Button onClick={() => navigate('/create-book')} variant="contained">Create Books</Button>
  </div> 
  <div className="createView">
    <div>
    <h3> After Deleted Operation</h3>
    <table border="1px" solid>
         <thead>
           <tr>
             <td>Book_ID</td>
             <td>Book Name</td>
             <td>Author</td>
             <td>ISBN Number</td>
             <td>Published Year</td>
             <action>Action</action>
           </tr>
         </thead>
         <tbody>
     {library.map((data) => (
              <tr key={data.id}>
               <td>{data.id}</td>
                <td>{data.book_Name}</td>
                <td>{data.Author}</td>
                <td>{data.ISBN_Number}</td>
                <td>{data.Published}</td>
                <td>
                <Button  onClick={()=>{navigate(`/delete/${data.id}`)}} variant="contained" color="error">Delete</Button>&nbsp;
                <Button  onClick={()=>{ navigate(`/book/${data.id}`)}} variant="contained" color="success">Profile</Button>&nbsp;
                <Button  onClick={()=>{ navigate(`/book_edit/${data.id}`)}} variant="contained" >Edit Details</Button>&nbsp;
                 </td>
              </tr>
          
            ))}
        </tbody>
        </table>
        </div>
        </div>
    </>
  )
  
}