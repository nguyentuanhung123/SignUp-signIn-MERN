import { useEffect, useState } from "react"
import UserIcons from "../components/icons/UserIcons"
import { useNavigate } from "react-router-dom"


const UserProfile = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        profilePic: ''
    })

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    if(!token) {
        navigate("/sign-in")
    }

    const handleUserProfile = async() => {
        const response = await fetch('http://localhost:8080/api/user-details', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `jwt ${localStorage.getItem('token')}`
            }
        })

        const dataResponse = await response.json();

        setData(dataResponse.data)
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate("/sign-in")
    }

    useEffect(() => {
        if(token) {
            handleUserProfile()
        }
    }, [])

    return (
        <div className="h-screen-center">
            <div className="user-profile">  
                <button className="logout-btn" onClick={handleLogout}>Logout</button>    
                {
                    data?.profilePic ? (
                        <div>
                            <img src={data?.profilePic} className="user-profile-pic"/>
                        </div>
                    ) : (
                        <div className="user-profile-icons">
                            <UserIcons />
                        </div>
                    )
                }
                <h1 className="user-name">{data?.name}</h1>
                <p className="user-email">{data?.email}</p>
            </div>
        </div>
    )
}

export default UserProfile