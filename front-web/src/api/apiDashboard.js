import axios from 'axios'
let obj
if (typeof window !== 'undefined') {
    const getAuthUser = localStorage.getItem('authUser')

    obj = getAuthUser=='undefined' ||getAuthUser==null?'': JSON.parse(getAuthUser?getAuthUser:'')
  }

const axiosInstance = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
    headers:{
    'Authorization':`Bearer ${obj?.token}`
    }
})
export const Api = {
    Dados:async()=>{
        let response = await axiosInstance.post('/')
        return response.data
    },
    
}