import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import '../css/login.css'

export const ForgotPage = () =>{
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:''
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

    const forgotHandler = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
            alert('Go to your e-mail!')
        } catch (e) {}
    }


    return (
        <div className="loginpage">
            <header className="header" id="header">
                <div className="container">
                    <img className="logo-mob" src={require("../img/img1.png")} alt="logo-mobile"/>
                    <div className="content">
                        <img className="logo2" src={require("../img/logo.png")} alt="logo"/>
                        <form action="#">
                            <div className="input-container">
                                <i className="fa fa-user icon1"></i>
                                <input className="input-field" type="text" placeholder="Email" name="email" onChange={changeHandler}/>
                            </div>
                            <button type="submit" className="btn" onClick={forgotHandler} disabled={loading}>Submit</button>
                        </form>
                    </div>
                </div>
            </header>
        </div>
    )
}