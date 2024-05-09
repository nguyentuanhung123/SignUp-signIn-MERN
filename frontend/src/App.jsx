import './App.css'
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  )
}

export default App