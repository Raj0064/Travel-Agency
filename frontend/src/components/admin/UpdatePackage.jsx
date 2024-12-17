import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSinglePackage from '@/hooks/useGetSinglePackage';
import { useSelector } from 'react-redux';

const UpdatePackage = () => {
  const { id } = useParams();
  useGetSinglePackage(id);
  const { singlePackage } = useSelector(store => store.package);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    startDate: "",
    endDate: "",
    file: '',
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (singlePackage) {
      setInput({
        title: singlePackage.title || "",
        description: singlePackage.description || "",
        price: singlePackage.price || "",
        startDate: singlePackage.startDate ? singlePackage.startDate.split('T')[0] : "",
        endDate: singlePackage.endDate ? singlePackage.endDate.split('T')[0] : "",
        file: '',
      });
    }
  }, [singlePackage]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
    } else {
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("startDate", input.startDate);
      formData.append("endDate", input.endDate);
      if (input.file) formData.append("file", input.file);

      const res = await axios.put(`${ADMIN_API_END_POINT}/packages/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm border border-border shadow-xl bg-card rounded-lg p-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Update Package</h1>
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
            <Label htmlFor="file" className="block text-sm font-medium text-foreground">
              Image
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
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
                  Updating...
                </span>
              ) : (
                'Update Package'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackage;
