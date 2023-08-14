import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material";
import {Provider} from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    palette:{
        secondary: {
            main: '#768396'
        }
    }
})
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline/>
            <App />
        </Provider>
    </ThemeProvider>
);

