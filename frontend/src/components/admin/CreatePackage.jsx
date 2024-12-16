import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreatePackage = () => {

  const navigate=useNavigate();

  const [input,setInput]=useState({
    title:"",
    description:"",
    price:0,
    dates:"",
    imageUrl:""
  })

  const formdata=new FormData();
  formdata.append("title",input.title);
  formdata.append("description", input.description);
  formdata.append("price", input.price);
  formdata.append("dates", input.dates);

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const submitHandler=async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res=await axios.post(`${ADMIN_API_END_POINT}/packages`,formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
       navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }finally{
      setLoading(false);
    }
  }
  const [loading,setLoading]=useState(false);

  return (
    <div className='flex items-center justify-center h-screen bg-purple-100' >
      <div className='w-2/3 md:w-1/3 lg:w-1/4 border shadow-2xl rounded-md  mx-auto p-5 bg-white flex flex-col gap-2'>
        <h1 className='text-xl font-bold'>Create New Package</h1>
        <Label className='font-semibold text-md'>Title</Label>
        <Input placeholder="Title of the tour" value={input.title} name="title" onChange={changeEventHandler}/>
        
        <Label className='font-semibold text-md'>Description</Label>
        <Input placeholder="Description of the tour" value={input.description} name="description" onChange={changeEventHandler}/>

        <Label className='font-semibold text-md'>Price</Label>
        <Input placeholder="Title of the tour package" value={input.price} name="price" onChange={changeEventHandler}/>

        <Label className='font-semibold text-md'>Available Dates</Label>
        <Input placeholder="Available dates of the tour package" value={input.dates} name="dates" onChange={changeEventHandler}/>
        <div>
          {
            loading ? <Button className="w-full my-3"><Loader/> Loading...</Button> :
              <Button className="w-full my-3" onClick={submitHandler}>Create New Package</Button>
          }
        </div>
      </div>

    </div>
  );
}

export default CreatePackage;
