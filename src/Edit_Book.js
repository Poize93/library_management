import  React,{useEffect, useState} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import {useParams} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Edit_Book(props){
    const [temp_book , setTempBook]=useState([])
    
    const library=props.library
    const setLibrary=props.setLibrary
    const navigate=useNavigate();
    const {id}=useParams();
    const book=[]
   console.log(id,"I am in edit books function")
   
    
      console.log( "checking temp book")
      useEffect(()=>{
        responseFunction();
      },[])
      const responseFunction = async ()=>{  
        const  response= await axios.get(`https://62152ebccdb9d09717b0e6f5.mockapi.io/Library/${id}` );
        setTempBook(response.data)
        
       
    };
    
    
   
  return(
    <>
    <div className="display">
        <Button onClick={() => navigate('/')} variant="contained">DashBoard</Button>
        <Button onClick={() => navigate('/books')}  variant="contained">Show Books</Button>
        <Button onClick={() => navigate('/create-book')} variant="contained">Create Books</Button>
    </div> 
    <div className="createView">
    
    <div>
   <h2>Editing Book: "{temp_book.book_Name}"</h2>
    <div>
    
             <Formik
          initialValues={{
            name: '',
            author: '',
            year: '',
            isbn: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = '*Required';
            }
            if (!values.author) {
              errors.author = '*Required';
            }
            if (!values.isbn) {
              errors.isbn = '*Required';
            }
            if (!values.year) {
              errors.year = '*Required';
            }
            return errors;
          }}
          onSubmit={(e)=>{
            console.log(e,"Editting Book")
          const editbook =async()=>{
            await  axios.put(`https://62152ebccdb9d09717b0e6f5.mockapi.io/Library/${id}`,
            {
              book_Name:e.name,
              Published:e.year,
              ISBN_Number:e.isbn,
              Author:e.author
            })
          }   
          
          editbook()
            
          const updtList=[...library]
          const repsonse=updtList.filter((a) => {
            if(a.id === id){
              a.book_Name=e.target[0].value;
              a.Published=e.target[3].value;
              a.ISBN_Number=e.target[2].value;
              a.Author=e.target[1].value;
              
              console.log(a.book_Name,a.Published,a.ISBN_Number,a.Author,"Checking values for uodation")
            }
           
           });
          
           setLibrary(updtList)
          console.log(library,"updated library")
          responseFunction();
    }}
      >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {/* {console.log(formik)}
              {console.log(formik.errors)} */}
              <table>
                <thead>
                  <tr>
                    <td>
                      <h3>Edit Book Details</h3>
                    </td>
                  </tr>
                </thead>
  
                <tbody>
                  <tr>
                    <td>
                    <TextField id="standard-basic" label="Book Name" variant="standard"   name="name"
                        placeholder="Book Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}/>
                    <span className="FieldError">{formik.errors.name}</span>
                    </td>
                  </tr>
  
                  <tr>
                    <td>
                    <TextField id="standard-basic" label="Author" variant="standard"  name="author"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.author} />
                      <span className="FieldError">{formik.errors.author}</span>
                    </td>
                  </tr>
  
                  <tr>
                    <td>
                    <TextField id="standard-basic" label="ISBN Number" variant="standard" name="isbn"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.isbn} />
                      <span className="FieldError">{formik.errors.isbn}</span>
                    </td>
                  </tr>
  
                  <tr>
                    <td>
                    <TextField id="standard-basic" label="Published Year" variant="standard" name="year"
                        placeholder="Published Year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year} />
                      <span className="FieldError">{formik.errors.year}</span>
                    </td>
                  </tr>
  
                  <tr>
                  <Button type="submit" variant="contained" color="success">Submit</Button>
                  </tr>
                </tbody>
              </table>
            </form>
          )}
        </Formik>
    </div>
</div>
    <div>
    <h3>Books List</h3>
    <table border="1px" solid>
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
  )
  }
  
  