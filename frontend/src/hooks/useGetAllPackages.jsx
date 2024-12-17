import { setPackages } from "@/redux/packageSlice";
import {USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllPackages = () => {
  const {packages}=useSelector(store=>store.package)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/packages/get`);

        if (res.data.success) {
          dispatch(setPackages(res.data.packages))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllPackages();
  }, [dispatch]);
}
export default useGetAllPackages;