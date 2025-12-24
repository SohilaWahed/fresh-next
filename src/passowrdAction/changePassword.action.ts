"use server"
import { getMyToken } from "@/utilities/getMyToken";

  export default async function changeMyPassword(currentPassword: string, password: string, rePassword: string) {
   try{
     const token=await getMyToken()
    if (!token) {
        throw new Error(" Not authorized");
    }
    
    const res=await  fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
      method: 'PUT',
        headers: {
        token,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({  currentPassword, password, rePassword }),
    });
    const payload=await res.json()    
    return payload
   }
     catch(err){
       return err   
         }
}           