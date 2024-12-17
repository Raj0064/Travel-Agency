import { setSinglePackage } from "@/redux/packageSlice";
import {ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSinglePackage = (packageId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchSinglePackage = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_END_POINT}/packages/${packageId}`,{withCredentials:true});

        dispatch(setSinglePackage(res.data.singlePackage));
      } catch (error) {
        console.log(error);
      }
    }
    fetchSinglePackage();
  }, [dispatch]);
}
export default useGetSinglePackage;