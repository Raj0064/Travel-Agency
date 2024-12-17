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
import Navbar from '../shared/Navbar';
import { Loader } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error occurred");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-border shadow-xl p-6 bg-card-background">
        <h1 className="text-xl font-semibold text-foreground mb-4">Log In</h1>
        <div className="space-y-4">
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
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              placeholder="password"
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
                Logging In...
              </span>
            ) : (
              ' Log In'
            )}
          </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link className="text-primary underline" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
