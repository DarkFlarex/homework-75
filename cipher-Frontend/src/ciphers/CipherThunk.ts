import { createAsyncThunk } from "@reduxjs/toolkit";
import { CipherText, CipherTextMutation } from "../types";
import axiosApi from "../axiosApi";

export const encodeCipher = createAsyncThunk<CipherText, CipherTextMutation>(
    'cipher/encode',
    async (cipherTextMutation) => {
        const response = await axiosApi.post('/encode', cipherTextMutation);
        console.log('Encode server response:', response.data);
        return response.data;
    }
);

export const decodeCipher = createAsyncThunk<CipherText, CipherTextMutation>(
    'cipher/decode',
    async (cipherTextMutation) => {
        const response = await axiosApi.post('/decode', cipherTextMutation);
        console.log('Decode server response:', response.data);
        return response.data;
    }
);