import {useState,useEffect} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [header,setHeader] = useState('')
    const [url,setUrl] = useState('')
    const navigate = useNavigate()
    const [count,setCount] = useState('')

    const handleSubmitOne=async(e)=>{
        let token = localStorage.getItem('user')
        try{
            let {data} = await axios.patch('https://pepper-adminpanel.onrender.com/api/components/update',
            { 'text':header },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
            )
        }
        catch(err){
            alert('Cannot update')
        }
    }

    const handleSubmitTwo=async(e)=>{
        let token = localStorage.getItem('user')
        try{
            let {data} = await axios.patch('https://pepper-adminpanel.onrender.com/api/components/update',
            { 'image':url },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
            )
        }
        catch(err){
            alert('Cannot update')
        }
    }

    const handleLogout=async(e)=>{
            let token = localStorage.getItem('user')
            try{
                await axios.get('https://pepper-adminpanel.onrender.com/api/admin/logout',
                { 
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                },
                )
                navigate('/',{replace:true})
            }
            catch(err){
                alert('Cannot logout')
            }
        }

        const main=async()=>{
            try{
                let {data} = await axios.get('https://pepper-adminpanel.onrender.com/api/components')
                setCount(data.count)
            }
            catch(err){
                console.log(err)
            }
            }
            useEffect(()=>{
                main()
            },[])   

    return ( 
        <>
             <header>
            <div className="navbar">
                <h2>Admin<span>portal</span></h2>
                <div onClick={()=>  handleLogout()}>logout</div>
            </div>

        </header>
        <div className="container">
            <form onSubmit={handleSubmitOne}>
                    <label>Header</label>
                    <input
                        type="text"
                        required
                        value={header}
                        onChange={(e) => { setHeader(e.target.value) }}
                    />
                    <button id="buttons">Update</button>
            </form>
            <form onSubmit={handleSubmitTwo}>
                    <label className="logo">Logo</label>
                    <input
                        type="text"
                        required
                        value={url}
                        onChange={(e) => { setUrl(e.target.value) }}
                    />
                    <button id="buttons">Update</button>
            </form>
            <div className="count">
                <h2>Count :</h2>
                <div>{count}</div>
            </div>
        </div>
        </>
     );
}
 
export default Home;