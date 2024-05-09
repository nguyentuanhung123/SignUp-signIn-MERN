import { useEffect } from 'react';
import './App.css'
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  useEffect(() => {
    navigate('user-profile')
  }, [])

  return (
    <>
      <ToastContainer />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default App