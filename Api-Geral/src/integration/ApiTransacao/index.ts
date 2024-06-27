import axios from 'axios'


const axiosInstance = axios.create({
    baseURL:`${process.env.API_INTEGRACOES}/`,
})
export const Api = {
    index:async(dados:any)=>{
        let response = await axiosInstance.post('/',dados)
        return response.data
    }
}