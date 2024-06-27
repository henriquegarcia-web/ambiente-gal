import bcrypt from 'bcrypt'

export const GeneretePassword = async (password:string) =>{
    let hash:any
    if(password){
        hash = bcrypt.hash(String(password),10)
    }
    return hash
}