import { TeacherLoginContext } from '../../../contexts/teacher/TeacherLoginContexts'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../../contexts/auth/AuthContext'
import TextField from '@mui/material/TextField';

const TeacherLogin = () => {
    const { teacher, setTeacher } = useContext(TeacherLoginContext)
    const { setAuthUser } = useAuthContext();
    const [errorLogin, setErrorLogin] = useState(false)

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const {data: teacher} = await axios.post('/api/teachers/login', {
                email: e.target.email.value,
                password: e.target.password.value
            })
            setTeacher(teacher);
            setAuthUser(teacher);
        } catch (error) {
            setErrorLogin(true);
        }   
    }


    return (
        <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#1D5D9B]">
            <div>
               <div className='flex flex-col justify-center pb-10'>
                    <h2 className='text-gray-900 font-bold text-5xl text-center w-3/4 mx-auto font-serif'>“Train up a child in the way he should go; even when he is old he will not depart from it.“</h2>
                    <span className='text-center pt-2 text-gray-800 text-2xl italic font-bold font-serif'>Proverbs 22:6</span>
               </div>
            </div>
            <div className="w-full max-w-md shadow-md rounded-md p-8 bg-[#FBEEAC]">
                <div>
                    <a href="/teacher">
                        <img
                            className="mx-auto h-24 w-auto"
                            src="/static/images/mral-logo-sm.png"
                            alt="MRAL logo small"
                        />
                    </a>
                    <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in as Teacher
                    </h2>
                </div>
                <form className="mt-4 space-y-6" onSubmit={loginHandler}>
                    <div className="flex flex-col space-y-4 rounded-md shadow-sm relative">
                        <p 
                            className={`w-full text-red-600 text-center absolute left-[50%] transform translate-x-[-50%] ${errorLogin ? 'block' : 'hidden'}`}
                        >
                            Invalid email or password.
                        </p>
                        <div className="pt-5">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={() => setErrorLogin(false)}
                                className={`border bg-white  ${errorLogin ? `border-red-600 bg-red-50 shake` : `border-gray-300`}`}
                                autoFocus
                            />
                        </div>
                        <div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={() => setErrorLogin(false)}
                                autoComplete="current-password"
                                className={`border bg-white  ${errorLogin ? `border-red-600 bg-red-50 shake` : `border-gray-300`}`}
                            />
                        </div>
                    </div>
        
                    <div className="pt-3">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white hover:bg-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-greenborder-green-700 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            </span>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TeacherLogin