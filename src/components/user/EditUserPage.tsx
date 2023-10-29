"use client"

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import axios from 'axios'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
// import { editUser } from '@/lib/testQuery'

// import { useQuery, useMutation } from 'react-query'

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   phone: Yup.string().required('phone is required'),
//   email: Yup.string().required('email is required'),
// })

type inpValue = {
  name: string;
  email: string;
  phone: string;
};


interface userData {
  id: string,
  name: string,
  email: string,
  phone: string
}

const fetchUsers = async (editId: string) => {
  return await axios.get(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist/${editId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      throw err;
    });

}



type userType = {
  name: string;
  phone: string;
  email: string;
  id?: string
};

const editUser = async (user: userType) => {
  try {
    const response = await axios.put(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

const EditUserPage =() => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const router = useRouter();
  const queryClient = useQueryClient()
  const { editId } = useParams()



  // const { mutate: updateUser, isError, isLoading } = useMutation((updatedData: any) => {
  //   return axios.put(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist/${editId}`, updatedData)
  // }, {
  //   onMutate: async (updateData) => {
  //     await queryClient.cancelQueries(['list']);
  //     const previousUser = queryClient.getQueryData(["list"])
  //     queryClient.setQueryData(['new'], updateData)
  //     return { previousUser, updateData }
  //   },
  //   onError: (context: any) => {
  //     queryClient.setQueryData(['list'], context.previousUser)
  //   },

  //   onSettled: () => {
  //     queryClient.invalidateQueries(['list'])
  //     toast.success('Successfully Edited!')
  //     router.push('/')

  //   },
  // })

  // const getUpdateData = () => {
  //   // setName(name)
  //   // setEmail(email)
  //   // setPhone(phone)
  //   // setId(id)

  //   updateUser({
  //     "name": name,
  //     "email": email,
  //     "phone": phone
  //   })
  //   router.push('/')
  // }


  //user update  mutation
  const mutationUpdateUser = useMutation(editUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      toast.success('Successfully Edited!')
      router.push("/");
    },
  });



  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationUpdateUser.mutate({
      ...(user as inpValue),
      id: editId as string,
    });
  }

  if (mutationUpdateUser.isError) return <div>Error</div>
  if (mutationUpdateUser.isLoading) return <div>Loading...</div>

  return (
    <section className=''>

      <form onSubmit={submitHandler} className='flex flex-col justify-start gap-y-4 mt-4 w-80 '>
        {/*  <div  className='flex flex-col justify-start gap-y-4 mt-4 w-80'> */}
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Name' value={user.name} onChange={changeHandler}
        />
        {/* {errors.name && <span>{errors.name.message}</span>} */}
        <br />
        <label htmlFor="name">Email:</label>
        <input
          name="email"
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Email' value={user.email} onChange={changeHandler}
        />
        {/* {errors.name && <span>{errors.name.message}</span>} */}
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          name="phone"
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Phone' value={user.phone} onChange={changeHandler}
        />
        {/* {errors.name && <span>{errors.name.message}</span>} */}
        <br />
        <button type="submit"
          className='bg-blue-500 text-white px-4 py-2 rounded-lg text-center'

        // disabled={isLoading}
        >

          Update Item
        </button>
      </form>
    </section>

  )
}


export default EditUserPage