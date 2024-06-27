import axios from 'axios'
let obj
if (typeof window !== 'undefined') {
    const getAuthUser = localStorage.getItem('authUser')
    obj = getAuthUser == 'undefined' || getAuthUser == null ? '' : JSON.parse(getAuthUser ? getAuthUser : '')
}
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/usuario`,
    headers: {
        'Authorization': `Bearer ${obj?.token}`
    }
})


export const Api = {
    Listagem: async () => {
        let response = await axiosInstance.get('/')
        return response.data
    },
    Cadastrar: async (dados) => {
        let response = await axiosInstance.post('/', dados)
        return response.data
    },
    Editar: async (dados) => {
        let response = await axiosInstance.put('/detalhes', dados)
        return response.data
    },
    Excluir: async (dados) => {
        let response = await axiosInstance.delete(`/${dados.id}/${dados.permissao}`)
        return response.data
    },
    EnviarToken: async (dados) => {
        let response = await axiosInstance.post(`/gerarToken`, dados)
        return response.data
    },
    validarToken: async (dados) => {
        let response = await axiosInstance.post(`/validarToken`, dados)
        return response.data
    },
    AlterarSenha: async (dados) => {
        let response = await axiosInstance.post(`/alterarsenha`, dados)
        return response.data
    },
    Atualizar: async (dados) => {
        let response = await axiosInstance.put(`/atualizar`, dados)
        return response.data
    }
}


