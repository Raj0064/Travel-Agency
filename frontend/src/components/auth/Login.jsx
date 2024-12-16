import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler= async (e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":'application/json'
        },
        withCredentials:true
      })
      if(res.data.success)
      {
        console.log(res)
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error occured");
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-purple-100'>
      <div className='w-2/3 md:w-1/3 lg:w-1/4 border shadow-2xl rounded-lg  mx-auto p-5 bg-white flex flex-col gap-2'>
        <h1 className='font-bold text-2xl md:text-3xl text-purple-900 mb-5'>Log In</h1>
        <Label className='font-semibold'>Email</Label>
        <Input type="email" name="email" value={input.email} placeholder="abc@gmail.com" onChange={changeHandler} />
        <Label className='font-semibold  '>Password</Label>
        <Input type="password" name="password" value={input.password} placeholder="password" onChange={changeHandler} />
        <div className='my-3'>
          <Button onClick={submitHandler} className="bg-violet-700 w-full hover:bg-violet-900">Log In</Button>
          <span className='text-gray-700 '>Dont have an account <Link className='text-blue-800' to="/register">Sign Up</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
