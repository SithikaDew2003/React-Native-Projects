import axios from "axios";

const URL = "https://e68c5a1eca37.ngrok-free.app/BackendApi";
const api = axios.create({
    baseURL:URL
});

export async function getData(id:number){
    const response = await api.get("/UserController?id="+id);
    return response.data;
}