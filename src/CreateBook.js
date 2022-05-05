import  React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function CreateBook(props){
    const library=props.library
    const setLibrary=props.setLibrary
    const navigate=useNavigate();
    console.log("I m in create Book function")
    return(
      <>
      <div className="display">
      <Button onClick={() => navigate('/')} variant="contained">DashBoard</Button>
    <Button onClick={() => navigate('/books')}  variant="contained">Show Books</Button>
    <Button onClick={() => navigate('/create-book')} variant="contained">Create Books</Button>
    </div> 
      <div className="createView">
      
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
              console.log("Submit VButton")
              const temp_lib=[... library]
              const responseFunction = async ()=>{  
              const  response= await axios.post('https://62152ebccdb9d09717b0e6f5.mockapi.io/Library',
              {
              book_Name:e.name,
              Published:e.year,
              ISBN_Number:e.isbn,
              Author:e.author

              });
              temp_lib.push(response.data)
              setLibrary(temp_lib)

              console.log(response.data , "checking my update API")

              };
              responseFunction(); 

          
        }}

       
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {console.log(formik)}
              {/* {console.log(formik.errors)} */}
              
              <table>
                <thead>
                  <tr>
                    <td>
                      <h3>Enter Book Details</h3>
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

  