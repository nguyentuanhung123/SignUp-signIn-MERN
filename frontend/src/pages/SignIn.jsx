import { useState } from "react"
import EyeClose from "../components/icons/EyeClose"
import EyesOpen from "../components/icons/EyesOpen"
import LockIcons from "../components/icons/LockIcons"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8080/api/sign-in', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataResponse = await response.json();

        if(dataResponse.error) {
            toast.error(dataResponse.message)
        }

        if(dataResponse.success) {
            toast.success(dataResponse.message)
            localStorage.setItem('token', dataResponse.token)
            navigate('/user-profile')
        }
    }

    console.log("data: ", data);

    return (
        <div className="h-screen-center">
            <div className="card-form">
                <div className="card-header">
                    <div className="lock-icons">
                        <LockIcons />
                    </div>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-element">
                        <label htmlFor="email">Email</label>
                        <div className="input-container">
                            <input type="email" id="email" name="email" value={data.email} disabled={loading} onChange={handleOnChange}/>
                        </div>
                    </div>

                    <div className="form-element">
                        <label>Password</label>
                        <div className="input-container">
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={data.password} disabled={loading} onChange={handleOnChange}/>
                            <div className="icons-password" onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? <EyesOpen /> : <EyeClose />
                                }
                            </div>
                        </div>
                    </div>

                    <button className="btn-sign">
                        {
                            loading ? 'Loading...' : "Sign In"
                        }
                    </button>
                </form>

                <p>Dont&apos;t have account <Link className="link" to={'/sign-up'}>Sign Up ?</Link></p>
            </div>
        </div>
    )
}

export default SignIn