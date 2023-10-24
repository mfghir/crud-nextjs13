
// "use client";


// import Link from "next/link";

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import {
//     useQuery,
//     useQueryClient,
//     QueryClient,
//     QueryClientProvider,
//     useMutation,
// } from '@tanstack/react-query'

// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { handleDelete } from '@/lib/testQusery';
// import usePagination from "./TestPagination";


// type usersType = {
//     name: string;
//     phone: string;
//     email: string;
//     id: string;
// };

// export const Test = () => {
//     // const [page, setPage] = useState(1)
//     const { isLoading, data, nextPage, prevPage, page } = usePagination();
//     const router = useRouter();

//     // async function fetchProjects(page = 1) {
//     //     const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`)
//     //     return data
//     // }

//     // const { status, data, error, isFetching, isPreviousData } = useQuery({
//     //     queryKey: ['users', page],
//     //     queryFn: () => fetchProjects(page),
//     //     keepPreviousData: true,
//     //     staleTime: 5000,
//     // })

//     // // Prefetch the next page!
//     // useEffect(() => {
//     //     if (!isPreviousData && data?.hasMore) {
//     //         queryClient.prefetchQuery({
//     //             queryKey: ['users', page + 1],
//     //             queryFn: () => fetchProjects(page + 1),
//     //         })

//     //     }
//     // }, [data, isPreviousData, page, queryClient])


//     // const [page, setPage] = useState(1)

//     // const { status, error, data, isPreviousData } = useQuery({
//     //     queryKey: ["users", { page }],
//     //     keepPreviousData: true,
//     //     queryFn: () => getUsersPaginated(page),
//     // })


//     // const idd= crypto.randomUUID()


//     const queryCl = useQueryClient();
//     const mutationDel = useMutation(handleDelete, {
//         // queryKey: ['users'],
//         onSuccess: () => {
//             queryCl.invalidateQueries("users");
//         },

//     });

//     return (
//         <section className='flex flex-col'>

//             <div className="flex justify-between items-center">
//                 <h1 className='font-bold text-center' >User Lists</h1>
//                 <Link href={`/create-user`}
//                     className='bg-orange-500 text-white my-4 px-4 py-2 rounded-lg text-center '
//                 >Create User
//                 </Link>
//             </div>


//             <ul className='my-4'>
//                 {data?.map((user: usersType) => (
//                     <li key={user.id} className='grid grid-cols-3 gap-4 mb-4'>
//                         <p className="flex flex-col">
//                             <span className="">{user.name}</span>
//                             <span className="">{user.phone}</span>
//                         </p>
//                         <button
//                             // onClick={() => handleDelete(user.id)}
//                             onClick={(e) => mutationDel.mutate(user.id)}
//                             className='bg-red-500 text-white w-32 px-4 py-2 rounded-lg'
//                         >delete</button>
//                         <Link href={`/edit/${user.id}`}
//                             //  onEdit={onEdit}
//                             className='bg-blue-500 text-white w-32 px-4 py-2 rounded-lg text-center'
//                         >edit
//                         </Link>
//                     </li>
//                 ))}
//             </ul>

//             <div className="flex justify-between">
//                 <button
//                     disabled={page === 1}
//                     onClick={prevPage}
//                     className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-400" : "bg-blue-400 cursor-pointer"} `}
//                 >Previous</button>

//                 <div>Current Page: {page}</div>

//                 <button
//                     disabled={page === 0}
//                     onClick={nextPage}
//                     className={`px-4 py-2 rounded-lg ${data?.length >= 5 ? "bg-gray-400" : "bg-blue-400 cursor-pointer"} `}
//                 >Next</button>
//             </div>



//         </section>

//     )

// };














"use client";


import Link from "next/link";
import { useState } from 'react'
import axios from 'axios'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { NextPage } from "next";
import toast, { Toaster } from 'react-hot-toast';
interface userData {
    id: string,
    name: string,
    email: string
}


const fetchUsers = async () => {
    return await axios.get("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist")
        .then((res) => res.data)
        .catch((err) => {
            console.log("err", err);
            throw err;
        });

}


export const Test: NextPage = () => {
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')

    const [email, setEmail] = useState('')
    const [id, setId] = useState('')

    //fetching the data
    const { data: users, isLoading } = useQuery<userData[]>(["list"], fetchUsers)
    console.log("users", users);

    //creating the user
    const { mutate: addNewUser } = useMutation((data: any) => {
        return axios.post("https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist", data)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['list'])
            alert('data created')
        }
    })

    // updating the user
    const { mutate: updateUser } = useMutation((updatedData: any) => {
        return axios.put(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist/${id}`, updatedData)
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

        //finally showing the secess message and refetching the data again
        onSettled: () => {
            queryClient.invalidateQueries(['list'])
            alert('Data Edited')

        },
    })

    //deleting the user
    const { mutate: deleteUser } = useMutation((id: any) => {
        return axios.delete(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/kdramalist/${id}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['list'])
            toast.success('Successfully Deleted!')
        }
    })


    if (isLoading) return <h1>Data is Loading</h1>


    const addUserHandler = () => {
        addNewUser({
            // "id": crypto.randomUUID(),
            "name": name,
            "email": email
        })
        clear()
    }

    const getUpdateData = (user: userData) => {
        setName(user.name)
        setEmail(user.email)
        setId(user.id)
        setShow(true)
    }

    const updateUserHandler = () => {
        updateUser({
            "name": name,
            "email": email
        })
        setShow(false)
        clear()
    }

    const deleteHandler = (user: userData) => {
        deleteUser(user.id)
        clear()
    }

    const clear = () => {
        setEmail("")
        setName("")
        setId("")
    }



    return (
        <section className='flex flex-col justify-between '>

            <div className="flex justify-between items-center">
                <h1 className='font-bold text-center' >User Lists</h1>
                <Link href={`/create-user`}
                    className='bg-orange-500 text-white my-4 px-4 py-2 rounded-lg text-center '
                >Create User
                </Link>
            </div>

            <h1 className='text-[21px] text-center m-2'>CURD with React Query</h1>

            <div className="grid grid-cols-2 gap-x-8">

                <table className=' border-collapse  shadow-md rounded-lg w-[100%] sm:w-[80%] lg:w-[60%] mx-auto my-[20px]'>
                    <thead className='bg-slate-100 rounded-lg '>
                        <tr className='text-[15px]  text-left font-light text-slate-600'>
                            <th className='p-3 font-md'>Name</th>
                            <th className='p-3 font-md'>Sn</th>
                            <th className='p-3 font-md'>Email</th>
                            <th className='p-3 font-md'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='bg-grey-200'>
                        {users?.map((user: any) => {
                            return (
                                <tr className='' key={user.id}>
                                    <td className='p-2 px-4 text-[13px]'>{user.id}</td>
                                    <td className='p-2 text-[13px]'>{user.name}</td>
                                    <td className='p-2 text-[13px]'>{user.email}</td>
                                    <td className='p-2'>
                                        <div>
                                            <Link href={`/edit/${user.id}`}>
                                                <button className='bg-blue-400 m-2 p-2 px-4 rounded-md font-semibold text-[12px]'
                                                // onClick={() => getUpdateData(user)} 
                                                >Edit</button>
                                            </Link>
                                            <button className='bg-red-400 m-2 p-2 px-3 rounded-md font-semibold text-[12px]' onClick={() => deleteHandler(user)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                {/* <div className='w-[80%] md:w-[60%] h-fit lg:w-80 bg-slate-200 rounded-lg shadow-md'>
                    <div className='p-2 flex flex-col w-full'>
                        <input required className='m-2 p-2 rounded-lg' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input required className='m-2 p-2 rounded-lg' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                        {/* {show? */}
                        {/* <button className='bg-blue-300 m-1 p-2 text-[12px] font-semibold rounded-lg text-slate-600' onClick={updateUserHandler} >Update User</button> */}
                        {/* : */}
                        {/* <button className='bg-green-300 m-1 p-2 text-[12px] font-semibold rounded-lg text-slate-600' onClick={addUserHandler} >Add User</button> */}
                        {/* } 
                    </div>
                </div> */}

            </div>
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </section>

    )

};



