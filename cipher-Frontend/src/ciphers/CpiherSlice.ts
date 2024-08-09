import {createSlice} from "@reduxjs/toolkit";
import {decodeCipher, encodeCipher} from "./CipherThunk";

export  interface  CiphersState {
    isCodedLoading:boolean;
    encoded?: string;
    decoded?: string;
}

const initialState: CiphersState = {
    isCodedLoading:false,
};

export const CiphersSlice = createSlice({
    name: "cipher",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(encodeCipher.pending, (state) => {
                state.isCodedLoading = true;
            })
            .addCase(encodeCipher.fulfilled, (state, action) => {
                state.isCodedLoading = false;
                state.encoded = action.payload.encoded;
                state.decoded = '';
            })
            .addCase(encodeCipher.rejected, (state) => {
                state.isCodedLoading = false;
            });

        builder
            .addCase(decodeCipher.pending, (state) => {
                state.isCodedLoading = true;
            })
            .addCase(decodeCipher.fulfilled, (state, action) => {
                state.isCodedLoading = false;
                state.decoded = action.payload.decoded;
                state.encoded = '';
            })
            .addCase(decodeCipher.rejected, (state) => {
                state.isCodedLoading = false;
            });
    },
    selectors:{
        selectCipherIsCodedLoading:(state)=> state.isCodedLoading,
        selectCipherEncoded:(state) => state.encoded,
        selectCipherDecoded:(state) => state.decoded,
    }
});

export const ciphersReducer = CiphersSlice.reducer;

export const{
    selectCipherIsCodedLoading,
    selectCipherEncoded,
    selectCipherDecoded,
} = CiphersSlice.selectors;
