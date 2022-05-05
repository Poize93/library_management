import  React,{useState ,useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Books(props){
    const library=props.library
    const setLibrary=props.setLibrary
    const navigate=useNavigate()

    console.log(library,"passing books into the library")
    
    // useEffect(async () => {
    //     const  response= await axios.get('https://62152ebccdb9d09717b0e6f5.mockapi.io/Library' );
    //     setLibrary(response.data)
    //   });

   return (
     <>
    <div className="display">
    <Button onClick={() => navigate('/')} variant="contained">DashBoard</Button>
    <Button onClick={() => navigate('/books')}  variant="contained">Show Books</Button>
    <Button onClick={() => navigate('/create-book')} variant="contained">Create Books</Button>
  </div>  
  <div className="createView">
  <div >
     <h3>Books List</h3>
     <table  border="1px" solid>
         <thead>
           <tr>
             <td>Book_ID</td>
             <td>Book Name</td>
             <td>Author</td>
             <td>ISBN Number</td>
             <td>Published Year</td>
             <td>Action</td>
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
    );



  }