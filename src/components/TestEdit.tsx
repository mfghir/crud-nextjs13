"use client"

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

// import { useQuery, useMutation } from 'react-query'

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   phone: Yup.string().required('phone is required'),
//   email: Yup.string().required('email is required'),
// })

interface userData {
  id: string,
  name: string,
  email: string
}



export default function TestEdit() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // const { data: item, isLoading, error } = useQuery(
  //   ['item', itemId],
  //   () => fetch(`https://jsonplaceholder.typicode.com/users/${itemId}`).then((res) => res.json())
  // )

  // const [updateItem, { isUpdating }] = useMutation(async (data) => {
  //   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${itemId}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //   return res.json()
  // })

  // const { handleSubmit, register, errors } = useForm({
  //   defaultValues: { name: item.name },
  //   validationSchema,
  // })

  // const onSubmit = async (data) => {
  //   try {
  //     const updatedItem = await updateItem(data)
  //     console.log(updatedItem) // log the updated item to the console
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }




  //updating the user

  const router = useRouter();
  const { editId } = useParams()
  console.log("editId",editId);
  const queryClient = useQueryClient()

  const { mutate: updateUser, isError, isLoading } = useMutation((updatedData: any) => {
    return axios.put(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist/${editId}`,updatedData)
  }, {
    onMutate: async (updateData) => {
      await queryClient.cancelQueries(['list']);
      const previousUser = queryClient.getQueryData(["list"])
      queryClient.setQueryData(['new'], updateData)
      return { previousUser, updateData }
    },
    // If the mutation fails, using the context to fall back to previous data
    onError: (context: any) => {
      queryClient.setQueryData(['list'], context.previousUser)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['list'])
      alert('data Edited')
      router.push('/')

  }
    //finally showing the secess message and refetching the data again
    // onSettled: () => {
    //   queryClient.invalidateQueries(['list'])
    //   alert('Data Edited')
    //   router.push('/')

    // },
  })

  const getUpdateData = (user: userData) => {
    setName(user.name)
    setEmail(user.email)
    // setId(user.id)
    // setShow(true)

  }

  // const updateUserHandler = () => {
  //   updateUser({
  //     "name": name,
  //     "email": email
  //   })
  //   // setShow(false)
  //   // clear()
  // }



  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <form onSubmit={getUpdateData} className='flex flex-col justify-start gap-y-4 mt-4 w-80'>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}
      />
      {/* {errors.name && <span>{errors.name.message}</span>} */}
      <br />
      <label htmlFor="name">Email:</label>
      <input
        name="Email"
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}
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
  )
}
