import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

const SignUp = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    role: "user"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error Occurred");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-border shadow-md bg-card-background p-6">
        <h1 className="text-xl font-semibold text-foreground mb-4">Sign Up</h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </Label>
            <Input
              id="name"
              type="text"
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
              Sign in...
            </span>
          ) : (
            ' Sign Up'
          )}
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="text-primary underline" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
