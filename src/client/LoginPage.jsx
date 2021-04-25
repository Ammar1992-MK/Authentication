import React from "react";
import {fetchJson} from "./Http";

function randomString(length) {
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
}

export const LoginPage = ({identityProvider }) => {

    const{discoveryURL, client_id} = identityProvider;

    const handleLogin = async () => {
        const {authorization_endpoint} = await fetchJson(discoveryURL)

        const state = randomString(30);
        const loginState = {state};
        sessionStorage.setItem("loginState", JSON.stringify(loginState))

        const params = {
            client_id,
            response_type: "token",
            scope : "openid email profile",
            redirect_uri : window.location.origin + "/login/callback",
            state : state
        };
        window.location.href = authorization_endpoint + "?" + new URLSearchParams(params);
    }
    return <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>Login</button>
    </div>;
}