import axios from 'axios'
let obj
if (typeof window !== 'undefined') {
    const getAuthUser = localStorage.getItem('authUser')
    obj = getAuthUser=='undefined' ||getAuthUser==null?'': JSON.parse(getAuthUser?getAuthUser:'')
  }

const axiosInstance = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/produtor`,
    headers:{
    'Authorization':`Bearer ${obj?.token}`,
    'Content-Type':'application/json'
    }
})
export const Api = {
    Listagem:async(dados)=>{
        let response = await axiosInstance.get('/',dados)
        return response.data
    },
    ListagemIndividual:async(dados)=>{
        let response = await axiosInstance.get(`/${dados.id}`)
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
    Taxas:async(dados)=>{
        let response = await axiosInstance.put('/taxas',dados)
        return response.data
    },
    Excluir:async(dados)=>{
        let response = await axiosInstance.delete(`/${dados.id}`)
        return response.data
    }
}