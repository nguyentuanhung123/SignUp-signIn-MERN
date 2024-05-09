import { useState } from "react"
import EyeClose from "../components/icons/EyeClose"
import EyesOpen from "../components/icons/EyesOpen"
import LockIcons from "../components/icons/LockIcons"
import { Link } from 'react-router-dom'

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.prebentDefault()
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

                <form className="form">
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