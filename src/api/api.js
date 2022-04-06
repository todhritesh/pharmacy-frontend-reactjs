import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "../context/context";

axios.defaults.baseURL = "https://pharmacy-backend-laravel.herokuapp.com/api"
// axios.defaults.baseURL = "http://localhost:8000/api"
axios.defaults.headers.common['Accept'] = "application/json"
// 
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

// with token
function useAuthAxios(){
    const {token} = useContext(TokenContext);
    const authAxios = axios.create({
    })
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    return authAxios;
}

//without token
function useAxios(){
    const {token} = useContext(TokenContext);
    const Axios = axios.create({
    })
    return Axios;
}


export {
    useAuthAxios ,
    useAxios , 
}