import axios from 'axios'
let obj
if (typeof window !== 'undefined') {
    const getAuthUser = localStorage.getItem('authUser')

    obj = getAuthUser=='undefined' ||getAuthUser==null?'': JSON.parse(getAuthUser?getAuthUser:'')
  }

const axiosInstance = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/afiliacao`,
    headers:{
    'Authorization':`Bearer ${obj?.token}`
    }
})
export const Api = {
    Listagem:async()=>{
        let response = await axiosInstance.get('/')
        return response.data
    },
    Produtos:async()=>{
        let response = await axiosInstance.get('/produtos')
        return response.data
    },
    Cadastrar:async(dados)=>{
        let response = await axiosInstance.post('/',dados)
        return response.data
    },
    Editar:async(dados)=>{
        let response = await axiosInstance.put('/',dados)
        return response.data
    },
    Excluir:async(dados)=>{
        let response = await axiosInstance.delete(`/${dados.id}`)
        return response.data
    }
}