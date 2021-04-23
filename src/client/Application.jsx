import React, {useState} from 'react'
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {ProfilePage} from "./profilePage";
import {fetchJson} from "./Http";
import {LoginPage} from './LoginPage'

export const Application = () => {

    const[access_token, setAccess_token] = useState();

    const googleIdentityProvider = {
        discoveryURL :"https://accounts.google.com/.well-known/openid-configuration",
        client_id :"889522382035-t4499kq70mdgk15liqi9lc7ilmb2lac7.apps.googleusercontent.com"
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
                <h1>Login callback</h1>
            </Route>
            <Route>
                <h1>404 not found</h1>
            </Route>
        </Switch>
    </BrowserRouter>

}