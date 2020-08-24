import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"
import '../css/register.css'


export const ResetPage = () =>{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        password: '', macthPassword: ''
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const resetHandler = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
            history.push('/login')
        } catch (e) {}
    }

    return (
        <div className="row loginpage">

            <header className="header" id="header">
                <div className="container">

                    <img className="logo-mob" src={require("../img/img1.png")} alt="logo-mobile"/>
                    <div className="content">
                        <img className="logo2" src={require("../img/logo.png")} alt="logo"/>
                        <form action="#">

                            <div className="input-container">
                                <i className="fa fa-key icon1"></i>
                                <input className="input-field" type="password" placeholder="Password"
                                       name="password" onChange={changeHandler}/>
                            </div>

                            <div className="input-container">
                                <i className="fa fa-key icon1"></i>
                                <input className="input-field" type="password" placeholder="Repeat password"
                                       name="macthPassword" onChange={changeHandler}/>
                            </div>

                            <button type="submit" className="btn" onClick={resetHandler} disabled={loading}>Submit</button>
                        </form>
                    </div>
                </div>
            </header>
        </div>
    )
}