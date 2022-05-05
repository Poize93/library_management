import  React,{useState } from 'react';
import './App.css';
import { useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Dashboard(){
    const navigate=useNavigate();
  return(
    <>
    
    <div className="createView">
    <h1>Welcome to the Guvi Library Management System </h1>
    </div>
    <div className="createView">
    <Button onClick={() => navigate('/books')}  variant="contained">Show Books</Button>
    <Button onClick={() => navigate('/create-book')} variant="contained">Create Books</Button>
    </div>
    <div className="image">
    
    </div>
    
  </>
  )
  }