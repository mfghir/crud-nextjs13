"use client"

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'


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


const Form = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  return (
    <section className='w-full '>
    <form onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col justify-start gap-y-4 mt-4 w-80'>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        {...register("name")}
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='Name' value={user.name} onChange={changeHandler}
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
        placeholder='Email' value={user.email} onChange={changeHandler}
      />
      {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
      <br />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        {...register("phone")}
        className='px-2 py-2 rounded-lg outline-none border border-gray-200 focus:border-blue-500'
        placeholder='Phone' value={user.phone} onChange={changeHandler}
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

export default Form