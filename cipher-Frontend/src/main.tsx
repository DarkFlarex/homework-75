import { createRoot } from 'react-dom/client'
import {CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter} from "react-router-dom";
import App from './App'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./app/store";
import theme from "./theme";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
)
