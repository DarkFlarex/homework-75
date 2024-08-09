import React, {useEffect, useState} from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CipherTextMutation } from '../../types';

interface Props {
    onSubmit: (cipherMutation: CipherTextMutation) => void;
    isLoading: boolean;
    encoded?: string;
    decoded?: string;
}

const CipherForm: React.FC<Props> = ({
     onSubmit,
     isLoading,
     encoded = '',
     decoded = ''
}) => {
    const [state, setState] = useState({
        password: '',
        textToEncode: encoded,
        textToDecode: decoded
    });

    const [regime, setRegime] = useState<'encode' | 'decode'>('decode');

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            textToEncode: encoded
        }));
    }, [encoded]);

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            textToDecode: decoded
        }));
    }, [decoded]);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEncode = async (event: React.FormEvent) => {
        event.preventDefault();
        if (state.password === '') {
            alert('Write password');
            return;
        }

        const encodedText = `Encoded(${state.textToDecode})`;

        onSubmit({
            password: state.password,
            message: state.textToDecode,
            encoded: encodedText,
            decoded: ''
        });

        setState(prevState => ({
            ...prevState,
            textToEncode: encodedText,
            textToDecode: ''
        }));
        setRegime('encode');
    };

    const handleDecode = async (event: React.FormEvent) => {
        event.preventDefault();
        if (state.password === '') {
            alert('Write password');
            return;
        }

        const decodedText = `Decoded(${state.textToEncode})`;

        onSubmit({
            password: state.password,
            message: state.textToEncode,
            encoded: '',
            decoded: decodedText
        });

        setState(prevState => ({
            ...prevState,
            textToDecode: decodedText,
            textToEncode: ''
        }));
        setRegime('decode');
    };

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={handleEncode}>
            <Grid item>
                <TextField
                    label="Decoded message"
                    id="textToDecode"
                    name="textToDecode"
                    value={state.textToDecode}
                    onChange={inputChangeHandler}
                    disabled={isLoading || regime === 'encode'}
                    multiline
                    rows={4}
                />
            </Grid>

            <Grid item>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField
                            required
                            label="Password"
                            id="password"
                            name="password"
                            value={state.password}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            type="button"
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<ArrowDownwardIcon />}
                            variant="contained"
                            onClick={handleEncode}
                            disabled={isLoading || regime === 'encode'}
                        >
                            Encode
                        </LoadingButton>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            type="button"
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<ArrowUpwardIcon />}
                            variant="contained"
                            onClick={handleDecode}
                            disabled={isLoading || regime === 'decode'}
                        >
                            Decode
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <TextField
                    label="Encoded message"
                    id="textToEncode"
                    name="textToEncode"
                    value={state.textToEncode}
                    onChange={inputChangeHandler}
                    disabled={isLoading || regime === 'decode'}
                    multiline
                    rows={4}
                />
            </Grid>
        </Grid>
    );
};

export default CipherForm;
