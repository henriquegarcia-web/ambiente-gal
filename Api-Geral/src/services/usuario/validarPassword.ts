import bcrypt from 'bcrypt'

export const ValiarPassword = async (password:string,hash:string) =>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(String(password),hash,(err, result)=>{
            resolve(result) 
        })
    })
}