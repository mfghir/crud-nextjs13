"use client"

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRef } from "react"
import axios from 'axios';
import { createUser } from '@/lib/testQusery';
// import { createUser } from "./api/posts"
// import Post from "./Post"


const TestCreate = () => {
    const nameRef = useRef<string | undefined>()
    const phoneRef = useRef()
    const emailRef = useRef()

    const router = useRouter();
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.currentTarget.name]: e.currentTarget.value,
        }));
    };


    const queryClient = useQueryClient()

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: data => {
            queryClient.setQueryData(["users", data.id], data)
            queryClient.invalidateQueries(["users"], { exact: true })
            // setCurrentPage(<Post id={data.id} />)
        },
    })





    function handleSubmit(e) {
        e.preventDefault()
        createUserMutation.mutate({
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
        })
        router.push('/')

    }



    return (
        <div className="flex min-h-screen flex-col items-center p-24 bg-gray-200">
            {/* {createUserMutation.isError && JSON.stringify(createUserMutation.error)} */}
            <h1>Create New User</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-y-4 mt-4' >
                <div>
                    <label>Name:</label>
                    <input ref={nameRef} type="text" name="name" 
                    // value={userData.name} onChange={handleChange} 
                    required
                        className='px-2 py-2 rounded-lg' />
                </div>
                <div>
                    <label>Phone:</label>
                    <input ref={phoneRef} type="text" name="phone" 
                    // value={userData.phone} onChange={handleChange} 
                    required
                        className='px-2 py-2 rounded-lg' />
                </div>
                <div>
                    <label>Email:</label>
                    <input ref={emailRef} type="email" name="email" 
                    // value={userData.email} onChange={handleChange} 
                    required
                        className='px-2 py-2 rounded-lg' />
                </div>
                <button
                    type="submit"
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg text-center'
                    disabled={createUserMutation.isLoading}>
                    {createUserMutation.isLoading ? "Loading..." : "Create"}
                </button>


            </form>
        </div>
    );
};

export default TestCreate;


