import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')    
    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            let {data} = await axios.post('https://pepper-adminpanel.onrender.com/api/admin/login',
            { 'email':email,'password':password })
            let token = data.token
            localStorage.setItem('user',token)
            navigate('/home',{replace:true})
        }
        catch(err){
            alert('Invalid credentials')
        }
    }

    return (
        <> 
        <header>
            <div className="navbar">
                <h2>Admin<span>portal</span></h2>
            </div>
        </header>
        <div className="loginForm">
        <h2 id="logIn">Log In</h2>
                <form className="login" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                     <button id="login">LogIn</button>
                </form>
        </div>
        </>
     );
}
 
export default Login;