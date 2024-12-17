import { setBookings } from "@/redux/bookingSlice";
import {ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllBookings = (packageId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_END_POINT}/bookings/${packageId}`,{withCredentials:true});
      console.log(res);
      
        if (res.data.success) {
          console.log(res.data);
          dispatch(setBookings(res.data.bookings))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllBookings();
  }, [dispatch]);
}
export default useGetAllBookings;