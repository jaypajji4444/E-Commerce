import * as actionTypes from "./actionTypes"
import axios from "axios"


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let url = "http://localhost:8080/signup"
        if (!isSignup) url = "http://localhost:8080/login"
        const authData = {
            email, password
        }
        console.log(url)
        axios.post(url, authData)
            .then(res => {
                console.log(res.data)
                const expirationDate=new Date(new Date().getTime() + 3600*1000)
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("expiration",expirationDate)
                localStorage.setItem("userId",res.data.user.id)
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                //dispatch({type:actionTypes.AUTH_FAIL    })
            })
    }
}

export const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}