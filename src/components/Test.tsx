"use client";


import Link from "next/link";
import { useState } from 'react'
import axios from 'axios'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { NextPage } from "next";
import toast, { Toaster } from 'react-hot-toast';

import { getUsersPaginated, useUsers } from "@/lib/testQuery";
import { useRouter } from "next/navigation";
import usePagination from "./TestPagination";

interface userData {
    id: string,
    name: string,
    email: string,
    phone: string
}


export const Test: NextPage = () => {
    const queryClient = useQueryClient()
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    const fetchUsers = async () => {
        return await axios.get(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist?_page=${currentPage}&_limit=10`)
            .then((res) => res.data)
            .catch((err) => {
                console.log("err", err);
                throw err;
            });
    }


    const { isLoading, data: users, nextPage, prevPage, page } =
        usePagination();

    //fetching the data
    // const { data: users, isLoading } = useQuery<userData[]>(["list"], fetchUsers)
    console.log("users", users);

    //deleting the user
    const { mutate: deleteUser } = useMutation((id: any) => {
        return axios.delete(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist/${id}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['list'])
            toast.success('Successfully Deleted!')
        }
    })

    const handlePagination = (page: number) => {
        // router.push(`/?page=${page}`, undefined, { shallow: true });
        router.push(`/?page=${page}`);
        setCurrentPage(page);
    };

    if (isLoading) return <h1>Data is Loading</h1>


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

            <div className="flex flex-col">

                <table className=' border-collapse  shadow-md rounded-lg w-[100%] sm:w-[80%] lg:w-[60%] mx-auto my-[20px]'>
                    <thead className='bg-slate-100 rounded-lg '>
                        <tr className='text-[15px]  text-left font-light text-slate-600'>
                            <th className='p-3 font-md'>Sn</th>
                            <th className='p-3 font-md'>Name</th>
                            <th className='p-3 font-md'>Email</th>
                            <th className='p-3 font-md'>Phone</th>
                            <th className='p-3 font-md'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='bg-grey-200'>
                        {users?.map((user: userData) => {
                            return (
                                <tr className='' key={user.id}>
                                    <td className='p-2 px-4 text-[13px]'>{user.id}</td>
                                    <td className='p-2 text-[13px]'>{user.name}</td>
                                    <td className='p-2 text-[13px]'>{user.email}</td>
                                    <td className='p-2 text-[13px]'>{user.phone}</td>
                                    <td className='p-2'>
                                        <div>
                                            <Link href={`/edit/${user.id}`}>
                                                <button className='bg-blue-400 m-2 p-2 px-4 rounded-md font-semibold text-[12px]'
                                                // onClick={() => getUpdateData(user)} 
                                                >Edit</button>
                                            </Link>
                                            <button
                                                className='bg-red-400 m-2 p-2 px-3 rounded-md font-semibold text-[12px]'
                                                onClick={() => deleteUser(user.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                <div className="flex justify-between items-center">
                    <button
                        // disabled={currentPage === 1}
                        // onClick={() => handlePagination(currentPage - 1)}
                        onClick={prevPage} disabled={page === 1}
                        className={`px-4 py-2 rounded-lg ${+page === 1 ? "bg-gray-400" : "bg-blue-200"} `}
                    >
                        prev page
                    </button>
                    <p className="mx-3 text-xl">{page}</p>
                    <button
                        // disabled={users.length === 0}
                        // onClick={() => handlePagination(currentPage + 1)}
                        onClick={nextPage}
                        className={`px-4 py-2 rounded-lg ${users?.length > 10 ? "bg-gray-400" : "bg-blue-200"} `}
                    >
                        next page
                    </button>
                </div>



            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </section>

    )

};



