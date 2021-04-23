import React from "react";
import {fetchJson} from "./Http";

export const LoginPage = ({identityProvider }) => {

    const{discoveryURL, client_id} = identityProvider;

    const handleLogin = async () => {
        const {authorization_endpoint} = await fetchJson(discoveryURL)
        const params = {
            client_id,
            response_type: "token",
            scope : "openid email profile",
            redirect_uri : window.location.origin + "/login/callback"
        };
        window.location.href = authorization_endpoint + "?" + new URLSearchParams(params);
    }
    return <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>Login</button>
    </div>;
}