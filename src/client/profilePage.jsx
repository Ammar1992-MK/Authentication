import React from "react";
import {useLoading} from "./useLoading";

export const ProfilePage = ({loadProfile}) => {
    const {error, loading, data} = useLoading(async() => {
        return await loadProfile()
    });

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return(
            <div>
                <h1>An error occurred</h1>
                <div>{error.toString()}</div>
            </div>
        )

    }
    return (
        <div>
            <h1>Profile</h1>
            <div>{data.name}</div>
        </div>
    );
}