import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { setPackages } from '@/redux/packageSlice';

const CreatePackage = () => {

  const navigate=useNavigate();
  
  const [input,setInput]=useState({
    title:"",
    description:"",
    price:"",
    startDate: '',
    endDate: '',
    file:''
  })

  const formdata=new FormData();
  formdata.append("title",input.title);
  formdata.append("description", input.description);
  formdata.append("price", input.price);
  formdata.append("startDate", input.startDate);
  formdata.append("endDate", input.endDate);

  formdata.append("file",input.file);

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const changeFileHandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]})
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
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm border border-border shadow-xl bg-card rounded-lg p-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Create New Package</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-foreground">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={input.title}
              placeholder="Enter the tour title"
              onChange={changeEventHandler}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={input.description}
              placeholder="Enter a description for the tour"
              onChange={changeEventHandler}
              required
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="block text-sm font-medium text-foreground">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={input.price}
              placeholder="Enter the package price"
              onChange={changeEventHandler}
              required
            />
          </div>

          {/* Dates */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/2">
              <Label htmlFor="startDate" className="block text-sm font-medium text-foreground">
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={input.startDate}
                onChange={changeEventHandler}
                required
                className="w-full"
              />
            </div>

            <div className="w-full md:w-1/2">
              <Label htmlFor="endDate" className="block text-sm font-medium text-foreground">
                End Date
              </Label>
              <Input
                className="bg-background text-foreground"
                id="endDate"
                name="endDate"
                type="date"
                value={input.endDate}
                onChange={changeEventHandler}
                required
              />
            </div>

          </div>
            {/* Image */}
            <div>
              <Label htmlFor="price" className="block text-sm font-medium text-foreground">
                Image
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                required
              />
            </div>


          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" size={16} />
                  Creating...
                </span>
              ) : (
                'Create New Package'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackage;