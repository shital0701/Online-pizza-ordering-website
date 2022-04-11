import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login';

const initialstate = {
    email:'',
    password: '',
    err: '',
    success: ''
}

export default function Login() {
    const [user, setUser] = useState(initialstate)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target 
        setUser({...user, [name]:value, err:'', success:''})

    }

    const handleSubmit = async e => {
       e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            Navigate('/')

        } catch (err) {
            err.response.data.msg  && 
            setUser({...user, err: err.response.data.msg, success:''})
        }
    }


    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            Navigate('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

  return (
    <section className="login">
        <div>
            <h2>LOGIN</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="text" placeholder="Enter your email" value={email} name="email" onChange={handleChangeInput} ></input>
                </div>

                <div>
                    <label htmlFor="email">password</label>
                    <input id="password" type="text" placeholder="************" value={password} name="password" onChange={handleChangeInput} ></input>
                </div>

                <div>
                    <button className="btn" type='submit'>Login</button>
                    <Link to="/forgot_password">Forgot your password?</Link>
                </div>
            </form>


            <div className="hr">Or Login With</div>

            <div className="social">
                <GoogleLogin
                    clientId="580503050372-qc6miv9cvg7bggokgsh1i15c8i4m2k0o.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>

            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </section>
  )
}
