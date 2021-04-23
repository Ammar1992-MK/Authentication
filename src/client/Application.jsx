import React from 'react'
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {ProfilePage} from "./profilePage";
import {fetchJson} from "./Http";
import {useState} from "react";

export const Application = () => {

    const[access_token, setAccess_token] = useState();

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
                <h1>Login</h1>
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