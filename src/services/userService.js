import { httpAxios } from "@/helper/httpHelper";

export async function SignUpService(user){
    const result = await httpAxios.post("/api/user",user).then((response)=>response.data);
    return result;
}

export async function LoginService(data){
    const result = await httpAxios.post("/api/login",data).then((response)=>response.data);
    return result;
}

export async function currentUser() {
  
    const result = await httpAxios.get("/api/current").then((response)=>response.data);
    return result;
}

export async function logout() {
  
    const result = await httpAxios.post("/api/logout").then((response)=>response.data);
    return result;
}
