"use client"

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, "name must have more length"),
  email: Yup.string().required('email is required').email("Invalid email"),
  phone: Yup.string().required('Phone is required').matches(/^09\d{2}\d{3}\d{4}$/, 'Please enter a valid Iranian phone number formatted as 09XX XXXX XXX')
})

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

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const queryClient = useQueryClient()
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { mutate: addNewUser, isError, isLoading } = useMutation((data: any) => {
    return axios.post("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist", data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['list'])
      toast.success('Successfully added!')
      router.push('/')
    }
  })

  // const addUserHandler = () => {
  // setName(name)
  // setEmail(email)
  // setPhone(phone)

  // addNewUser({
  //   "name": name,
  //   "email": email,
  //   "phone": phone
  // })
  // router.push('/')
  // }


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(formOptions);

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

      <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-start gap-y-4 w-full md:w-80 backdrop-blur-sm bg-white/30 p-4 rounded-lg'>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Name'
          name='name'
          value={user.name} onChange={changeHandler}
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
        <br />

        <label htmlFor="name">Email:</label>
        <input
          type="text"
          id="email"
          {...register("email")}
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Email'
          name='email'
          value={user.email} onChange={changeHandler}
        />
        {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
          placeholder='Phone'
          name="phone"
          value={user.phone} onChange={changeHandler}
        />
        {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
        <br />
        <button type="submit"
          className='bg-blue-500 text-white px-4 py-2 rounded-lg text-center'
        // disabled={isLoading}
        >Create Item
        </button>
      </form>
    </section>
  )
}
