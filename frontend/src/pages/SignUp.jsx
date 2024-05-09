import { useState } from "react"
import EyeClose from "../components/icons/EyeClose"
import EyesOpen from "../components/icons/EyesOpen"
import LockIcons from "../components/icons/LockIcons"
import { Link, useNavigate } from 'react-router-dom'
import imageToBase64 from "../helpers/imageToBase64"
import { toast } from "react-toastify"

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
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

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        let Image64 = "";
        if(file?.name) {
            console.log(file);
            Image64 = await imageToBase64(file)
        }

        setData((prev) => {
            return{
                ...prev,
                profilePic: Image64
            }
        })

        console.log("imageToBase64", Image64);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.password !== data.confirmPassword) {
            toast.error("Password and cofirm password must be same !")
            return
        }

        setLoading(true)
        const response = await fetch("http://localhost:8080/api/sign-up", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataResponse = await response.json();
        setLoading(false)
        console.log("response in sign up page: ", dataResponse);

        if(dataResponse.error) {
            toast.error(dataResponse.message)
        }

        if(dataResponse.success) {
            toast.success(dataResponse.message)
            setData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                profilePic: ""
            })
            navigate('/sign-in')
        }
    }

    console.log("data: ", data);

    return (
        <div className="h-screen-center">
            <div className="card-form">
                <div className="card-header">
                    <div className="sign-form-lock-container">
                        {
                            data.profilePic ? (
                                <img src={data.profilePic} className="profile-pic"/>
                            ) : (
                                <div className="lock-icons">
                                    <LockIcons />
                                </div>
                            )
                        }
                        <form>
                            <label htmlFor="upload-pic-input">
                                <div className="upload-pic-text">Upload Pic</div>
                                <input type="file" id="upload-pic-input" onChange={handleUploadFile}/>
                            </label>
                        </form> 
                    </div>
                </div>

                <form className="form" onSubmit={handleSubmit}>

                    <div className="form-element">
                        <label htmlFor="name">Name :</label>
                        <div className="input-container">
                            <input type="text" id="name" name="name" value={data.name} disabled={loading} onChange={handleOnChange}/>
                        </div>
                    </div>

                    <div className="form-element">
                        <label htmlFor="email">Email :</label>
                        <div className="input-container">
                            <input type="email" id="email" name="email" value={data.email} disabled={loading} onChange={handleOnChange}/>
                        </div>
                    </div>

                    <div className="form-element">
                        <label htmlFor="password">Password :</label>
                        <div className="input-container">
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={data.password} disabled={loading} onChange={handleOnChange}/>
                            <div className="icons-password" onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? <EyesOpen /> : <EyeClose />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="form-element">
                        <label htmlFor="confirmPassword">Confirm password :</label>
                        <div className="input-container">
                            <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={data.confirmPassword} disabled={loading} onChange={handleOnChange}/>
                            <div className="icons-password" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {
                                    showConfirmPassword ? <EyesOpen /> : <EyeClose />
                                }
                            </div>
                        </div>
                    </div>

                    <button className="btn-sign">
                        {
                            loading ? 'Loading...' : "Sign Up"
                        }
                    </button>
                </form>

                <p>Already have account <Link className="link" to={'/sign-in'}>Sign In ?</Link></p>
            </div>
        </div>
    )
}

export default SignUp;