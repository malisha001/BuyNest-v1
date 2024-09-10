import { createContext,useReducer,useEffect } from 'react'

export const AuthContext = createContext()

export const AuthReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user:action.payload,
            }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return {
                ...state,
                user:null,
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,{
        user:null
    })

    useEffect(() => {
        const user = localStorage.getItem('user')

        if(user){
            dispatch({type:'LOGIN',payload:user})
        }
    },[])

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}