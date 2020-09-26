import React, { createContext, useEffect, useState } from 'react';
import axios from './axios'

interface User{
    uid: number,
    name: string,
    auth: boolean
};
const fakeUser: User = {
    uid: 0,
    name: '',
    auth: false
}
export const UserContext = createContext(fakeUser);
const UserContextProvider = (props: any) => {
    const [uid, setUid] = useState(fakeUser.uid);
    const [name, setName] = useState(fakeUser.name);
    const [auth, setAuth] = useState(fakeUser.auth);
    useEffect(() => {
        axios.get('/v1/user/me', {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then(response => {
            setUid(response.data.uid)
            setName(response.data.name)
            setAuth(true)
        }).catch(((err: any) => {
            console.log(err);
            setAuth(false)
        }))
    }, [])
    
    const user: User= {
        uid: uid,
        name: name,
        auth: auth
    }
  return (
      <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;
