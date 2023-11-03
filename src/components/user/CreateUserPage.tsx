"use client"

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import toast from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'

import Form from '../Form'


type FormData = {
  name: string,
  email: string,
  phone: string
}


export default function CreateUserPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();
  const queryClient = useQueryClient()

  const { mutate: addNewUser, isError, isLoading } = useMutation((data: any) => {
    return axios.post("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist", data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['list'])
      toast.success('Successfully added!')
      router.push('/')
    }
  })


  const onSubmit = (data: FormData) => {
    addNewUser(data);
    router.push('/')

  };

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <section className='w-full mx-auto overflow-hidden'>
      <Link href="/">
        <button className='bg-red-300 text-white px-4 py-2 rounded-lg text-center'>Back</button>
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 my-4">Create User</h1>

      <Form user={user} setUser={setUser} onSubmit={onSubmit} />
    </section>
  )
}
