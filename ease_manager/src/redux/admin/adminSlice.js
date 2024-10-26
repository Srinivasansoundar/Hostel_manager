import { createSlice } from "@reduxjs/toolkit";
const initialState={
    blockData:null,
}
const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        updateBlocks:(state,action)=>{
            state.blockData=action.payload
        },
    }
})
export const {updateBlocks}=adminSlice.actions;
export default adminSlice.reducer