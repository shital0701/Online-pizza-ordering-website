import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'


const initialstate = {
    name:'',
    email:'',
    password:'',
    cf_password: '',
    err: '',
    success: ''
}

export default function Register() {
    const [user, setUser] = useState(initialstate)
    

    const {name, email, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target 
        setUser({...user, [name]:value, err:'', success:''})

    }

    const handleSubmit = async e => {
       e.preventDefault()
       if(isEmpty(name) ||  isEmpty(password))
       return setUser({...user, err: "Please fill all the fields.", success:''})

       if(!isEmail(email))
       return setUser({...user, err: "Invalid email.", success:''})

       if(isLength(password))
       return setUser({...user, err: "Password must be  at least 6 characters. ", success:''})

       if(!isMatch(password, cf_password))
       return setUser({...user, err: "Password did not match", success:''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success:res.data.msg})

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success:''})
        }
    }

  return (
    <section className="login">
        <div>
            <h2>REGISTER</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter your name" value={name} name="name" onChange={handleChangeInput} ></input>
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="text" placeholder="Enter your email" value={email} name="email" onChange={handleChangeInput} ></input>
                </div>

                <div>
                    <label htmlFor="password">password</label>
                    <input id="password" type="password" placeholder="************" value={password} name="password" onChange={handleChangeInput} ></input>
                </div>

                <div>
                    <label htmlFor="cf_password">Confirm password</label>
                    <input id="cf_password" type="password" placeholder="************" value={cf_password} name="cf_password" onChange={handleChangeInput} ></input>
                </div>

                <div>
                    <button className="btn" type='submit'>Register</button>
                </div>
            </form>

            <p>already have an account? <Link to="/login">Login</Link></p>
        </div>
    </section>
  )
}
