import './App.css'
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
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