import axios from 'axios'
let obj
if (typeof window !== 'undefined') {
    const getAuthUser = localStorage.getItem('authUser')

    obj = getAuthUser=='undefined' ||getAuthUser==null?'': JSON.parse(getAuthUser?getAuthUser:'')
  }

const axiosInstance = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/transacao`,
    headers:{
    'Authorization':`Bearer ${obj?.token}`
    }
})
export const Api = {
    Listagem:async()=>{
        let response = await axiosInstance.get('/')
        return response.data
    },
    Cadastrar:async(dados)=>{
        let response = await axiosInstance.post('/',dados)
        return response.data
    },
    Status:async(dados)=>{
        let response = await axiosInstance.post('/status',dados)
        return response.data
    },
}