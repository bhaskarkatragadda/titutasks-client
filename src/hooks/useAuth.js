

export const auth = () =>{
    return localStorage.getItem('accessToken')
}

export const setAuth = (value) =>{
    localStorage.setItem('accessToken',value)
}
