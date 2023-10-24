"use client"

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

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



export default function TestAdd() {
    const [name, setName] = useState('');
    // const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();
    const queryClient = useQueryClient()

    const { mutate: addNewUser, isError, isLoading } = useMutation((data: any) => {
        return axios.post("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist", data)
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
        
        addNewUser({
            "name": name,
            "email": email
        })
        router.push('/')

        // clear()
    }

    if (isError) return <div>Error</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <form onSubmit={addUserHandler} className='flex flex-col justify-start gap-y-4 mt-4 w-80'>
            {/*  <div  className='flex flex-col justify-start gap-y-4 mt-4 w-80'> */}
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

                Create Item
            </button>
        </form>
    )
}
