import { createSlice } from "@reduxjs/toolkit";

const packageSlice=createSlice({
  name:"package",
  initialState:{
    packages:[],
    singlePackage:""
  },
  reducers:{
    setPackages:(state,action)=>{
      state.packages=action.payload;
    },
    setSinglePackage:(state,action)=>{
      state.singlePackage=action.payload;
    }
  }
})
export default packageSlice.reducer;
export const {setPackages,setSinglePackage}=packageSlice.actions;
