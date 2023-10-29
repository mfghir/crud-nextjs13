"use client"

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup';
// import { useQuery, useMutation } from 'react-query'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().email('Invalid email').required('phone is required'),
  email: Yup.string().required('email is required'),
})

interface userData {
  id: string,
  name: string,
  email: string,
  phone: string
}



export default function CreateUserPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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

  const addUserHandler = () => {
    setName(name)
    setEmail(email)
    setPhone(phone)

    addNewUser({
      "name": name,
      "email": email,
      "phone": phone
    })
    router.push('/')
  }



    const { register, handleSubmit, errors } = useForm<userData>({
      resolver: yupResolver(validationSchema),
    });
  
    const onSubmit = (data: FormValues) => {
      addNewUser(data);
    };

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <section className='w-full '>
      <form  onSubmit={handleSubmit(onSubmit)}
      // onSubmit={addUserHandler} 
      className='flex flex-col justify-start gap-y-4 mt-4 w-80'>
        <label htmlFor="name">Name:</label>
        <input
              type="text"
              id="name"
              name="name"
              ref={register}
          // name="name"
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}
        />
            {errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
        <br />

        <label htmlFor="name">Email:</label>
        <input
         type="text"
         id="email"
         name="email"
         ref={register}
          // name="email"
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}
        />
          {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
         type="text"
         id="phone"
         name="phone"
         ref={register}
          // name="phone"
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
        <br />
        <button type="submit"
          className='bg-blue-500 text-white px-4 py-2 rounded-lg text-center'

        // disabled={isLoading}
        >

          Create Item
        </button>
      </form>
    </section>
  )
}
