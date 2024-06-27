import axios from 'axios'
const axiosInstance = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/usuario`,
    headers:{
    'Content-Type':'application/json'
    }
})
export const Api = {
    Login:async(dados)=>{
        let response = await axiosInstance.post('/login',dados)
        if(response?.data?.user?.id){
            localStorage.setItem('authUser',JSON.stringify(response.data.user))
        }
        return response.data
    }
}