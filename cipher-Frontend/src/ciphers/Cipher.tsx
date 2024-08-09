import CipherForm from './components/CipherForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { encodeCipher, decodeCipher } from './CipherThunk';
import { useEffect } from 'react';
import {CipherTextMutation} from "../types";
import {selectCipherDecoded, selectCipherEncoded, selectCipherIsCodedLoading} from "./CpiherSlice";

const Cipher = () => {
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectCipherIsCodedLoading);
    const encoded = useAppSelector(selectCipherEncoded);
    const decoded = useAppSelector(selectCipherDecoded);

    useEffect(() => {
    }, [isCreating, encoded, decoded]);

    const handleFormSubmit = async (cipherMutation: CipherTextMutation) => {
        if (cipherMutation.encoded) {
            await dispatch(encodeCipher(cipherMutation));
        } else if (cipherMutation.decoded) {
            await dispatch(decodeCipher(cipherMutation));
        }
    };

    return (
        <CipherForm
            onSubmit={handleFormSubmit}
            isLoading={isCreating}
            encoded={encoded}
            decoded={decoded}
        />
    );
};

export default Cipher;
