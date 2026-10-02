import {hashSync , compareSync} from "bcrypt";



export const Hash = async(plainText , SALT_ROUNDES = 12)=>{
    return hashSync(plainText , SALT_ROUNDES)
}



export const Compare = async ( plainText , cipherText) =>{
    return compareSync(plainText , cipherText)
}