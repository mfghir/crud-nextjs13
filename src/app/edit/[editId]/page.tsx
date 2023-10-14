import EditContactPage from '@/components/EditContact'
import EditUserPage from '@/components/user/EditUserPage'
import { useParams } from 'next/navigation'
import React from 'react'

// const getUserById = async (editId:any) => {
//   try {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
//       cache: "no-store",
//     });

//     console.log("res",res.status);


//     if (!res.ok) {
//       throw new Error("Failed to fetch topic");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };



const EditId = () => {


  return (
    <>
      <EditContactPage />
      {/* <EditUserPage /> */}

    </>

  )
}

export default EditId