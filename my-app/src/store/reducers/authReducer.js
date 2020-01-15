import * as actionTypes from "../actions/actionTypes"

const initialState={
    error:null,
    userId:null,
    userEmail:null,
    token:null,
    Authenticated:null,
    loading:false
}

const authStart=(state,action)=>{
    return {
        ...state,
        loading:true
    }
}

const authSuccess=(state,action)=>{
    return{
        ...state,
        loading:false,
        Authenticated:true,
        userId:action.payload.user.id,
        error:null,
        userEmail:action.payload.user.email,
        token:action.payload.token
    }
}

const authLogout=(state,action)=>{
    return{
        ...state,
        Authenticated:false,
        token:null,
        userId:null,
        userEmail:null,
        loading:false,
        error:null

    }
}

const authReducer=(state=initialState,action)=>{

    switch (action.type) {
        case actionTypes.AUTH_START:return authStart(state,action)
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action)    
        // case actionTypes.AUTH_FAIL:return authFail(state,action)
         case actionTypes.AUTH_LOGOUT:return authLogout(state,action)
        default:return state;
    }
}

export default authReducer