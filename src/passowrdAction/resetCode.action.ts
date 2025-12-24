"use server"

export async function verifyResetCode(resetCode: string) {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
      method: 'PUT',
      headers: {
         "Content-Type": "application/json" 
        },
      body: JSON.stringify({ resetCode }),
    });
    const payload = await res.json();
    return payload;
  }  catch(err){
       return err   
         }
}
