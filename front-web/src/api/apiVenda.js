import axios from 'axios'
let obj
if (typeof window !== 'undefined') {
    const getAuthUser = localStorage.getItem('authUser')
    obj = getAuthUser=='undefined' ||getAuthUser==null?'': JSON.parse(getAuthUser?getAuthUser:'')
  }

const axiosInstance = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/venda`,
    headers:{
    'Authorization':`Bearer ${obj?.token}`
    }
})
export const Api = {
    Cadastrar:async(dados)=>{
        let response = await axiosInstance.post('/',dados)
        return response.data
    },
    Listagem:async(dados)=>{
        let response = await axiosInstance.get('/',dados)
        return response.data
    },
}


