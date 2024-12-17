import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Loader } from 'lucide-react';

const BookingForm = () => {
  const { id } = useParams();
  console.log(id);
  const {user}=useSelector(store=>store.auth)
  const [loading,setLoading]=useState(false);
  const [input, setInput] = useState({
    name: user?.name||"",
    email: user?.email || "",
    number: user?.number || "",
    travelersNumber: 0,
    specialrequest: "",
  });


  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
  
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/booking/${id}`, input, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/explore");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error occurred");
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="w-full max-w-sm md:max-w-lg rounded-lg border border-border shadow-xl p-6 bg-card-background">
          <h1 className="text-xl font-semibold text-foreground mb-4">Booking Form</h1>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </Label>
              <Input
                id="name"
                type="email"
                name="name"
                value={input.name}
                placeholder="John Cena"
                onChange={changeHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={input.email}
                placeholder="abc@gmail.com"
                onChange={changeHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="number" className="text-sm font-medium text-foreground">
                Mobile Number
              </Label>
              <Input
                id="number"
                type="text"
                name="number"
                value={input.number}
                placeholder="9876543210"
                onChange={changeHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="travelersNumber" className="text-sm font-medium text-foreground">
               No of Travellers
              </Label>
              <Input
                id="travelersNumber"
                type="number"
                name="travelersNumber"
                value={input.travelersNumber}
                placeholder="3"
                onChange={changeHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="specialrequest" className="text-sm font-medium text-foreground">
               Special Request
              </Label>
              <Textarea
                id="specialrequest"
                type="number"
                name="specialrequest"
                value={input.specialrequest}
                placeholder="If any Special Requests"
                onChange={changeHandler}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            onClick={submitHandler}
            type="submit"
            className="mt-4 w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" size={16} />
                Booking...
              </span>
            ) : (
              ' Confirm Booking'
            )}
          </Button>

        </div>
      </div>
    </>
  );
};

export default BookingForm;
