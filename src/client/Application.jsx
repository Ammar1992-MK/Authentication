import React, {useState} from 'react'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import {ProfilePage} from "./profilePage";
import {fetchJson} from "./Http";
import {LoginPage} from './LoginPage'
import {LoginCallback} from "./LoginCallback";

export const Application = () => {

    const[access_token, setAccess_token] = useState();

    const googleIdentityProvider = {
        discoveryURL:
            "https://accounts.google.com/.well-known/openid-configuration",
        client_id:
            "889522382035-5iac913i6aqsf92bm5goq8f6unu3b97d.apps.googleusercontent.com"
    };

    const loadProfile = async () => {
        return fetchJson("/api/profile", {
            headers: {
              ...(access_token ? {Authorization : `Bearer ${access_token}`} : {}),
            }
        });
    }
    return <BrowserRouter>
        <Switch>
            <Route exact path={"/"}>
                <h1>Welcome</h1>
                <ul>
                    <li><Link to={"/profile"}>Profile</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                </ul>
            </Route>
            <Route path={"/profile"}>
                <ProfilePage loadProfile={loadProfile}/>
            </Route>
            <Route exact path={"/login"}>
                <LoginPage identityProvider={googleIdentityProvider}/>
            </Route>
            <Route path={"/login/callback"}>
                <LoginCallback identityProvider={googleIdentityProvider} onAccessToken={access_token => setAccess_token(access_token)}/>
            </Route>
            <Route>
                <h1>404 not found</h1>
            </Route>
        </Switch>
    </BrowserRouter>

}