"use client"

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import toast from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'

import Form from '../Form'
import { Dna } from 'react-loader-spinner'



type UserType = {
  name: string;
  phone: string;
  email: string;
  id?: string
};

const editUser = async (user: UserType) => {
  try {
    const response = await axios.put(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

const EditUserPage = () => {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();
  const queryClient = useQueryClient()
  const { editId } = useParams()


  const mutationUpdateUser = useMutation(editUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      toast.success('Successfully Edited!')
      router.push("/");
    },
  });

  const onSubmit = () => {
    mutationUpdateUser.mutate({
      ...(user as UserType),
      id: editId as string,
    });
    router.push('/')
  };


  if (mutationUpdateUser.isError) return <div>Error</div>
  if (mutationUpdateUser.isLoading) return <Dna
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
  />

  return (
    <section className='w-full mx-auto overflow-hidden'>
      <Link href="/">
        <button className='bg-red-300 text-white px-4 py-2 rounded-lg text-center'>Back</button>
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 my-4">Edit User</h1>

      <Form user={user} setUser={setUser} onSubmit={onSubmit} />
    </section>

  )
}


export default EditUserPage