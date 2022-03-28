import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./containers/Home";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./containers/Detail";
import Layout from "./components/Layout";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:pokemonName" element={<Detail />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
