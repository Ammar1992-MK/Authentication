import React, {useState, useEffect} from 'react'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import {ProfilePage} from "./profilePage";
import {fetchJson} from "./Http";
import {LoginPage} from './LoginPage'
import {LoginCallback} from "./LoginCallback";

function useLocalStorage(key){
    const[value, setValue] = useState( () => {
        return JSON.parse(localStorage.getItem(key))
    });

    useEffect( () => {
        if(value){
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key);
        }
    }, [value])

    return [value, setValue]
}

export const Application = () => {

    const[access_token, setAccess_token] = useLocalStorage("access_token");

    const googleIdentityProvider = {
        discoveryURL:
            "https://accounts.google.com/.well-known/openid-configuration",
        client_id:
            "889522382035-5iac913i6aqsf92bm5goq8f6unu3b97d.apps.googleusercontent.com"
    };

    const microsoftIdentityProvider = {
        discoveryURL:
            "https://login.microsoftonline.com/common/.well-known/openid-configuration",
        client_id:
            "8732f2f7-9efb-4c1e-a92a-8b21ed32ade4"
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
                <LoginPage identityProvider={microsoftIdentityProvider}/>
            </Route>
            <Route path={"/login/callback"}>
                <LoginCallback identityProvider={microsoftIdentityProvider} onAccessToken={access_token => setAccess_token(access_token)}/>
            </Route>
            <Route>
                <h1>404 not found</h1>
            </Route>
        </Switch>
    </BrowserRouter>

}