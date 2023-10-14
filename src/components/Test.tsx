
"use client";


import Link from "next/link";

import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    useMutation,
} from '@tanstack/react-query'

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { handleDelete } from '@/lib/testQusery';
import usePagination from "./TestPagination";


type usersType = {
    name: string;
    phone: string;
    email: string;
    id: string;
};

export const Test = () => {
    // const [page, setPage] = useState(1)
    const { isLoading, data, nextPage, prevPage, page } = usePagination();
    const router = useRouter();

    // async function fetchProjects(page = 1) {
    //     const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`)
    //     return data
    // }

    // const { status, data, error, isFetching, isPreviousData } = useQuery({
    //     queryKey: ['users', page],
    //     queryFn: () => fetchProjects(page),
    //     keepPreviousData: true,
    //     staleTime: 5000,
    // })

    // // Prefetch the next page!
    // useEffect(() => {
    //     if (!isPreviousData && data?.hasMore) {
    //         queryClient.prefetchQuery({
    //             queryKey: ['users', page + 1],
    //             queryFn: () => fetchProjects(page + 1),
    //         })

    //     }
    // }, [data, isPreviousData, page, queryClient])


    // const [page, setPage] = useState(1)

    // const { status, error, data, isPreviousData } = useQuery({
    //     queryKey: ["users", { page }],
    //     keepPreviousData: true,
    //     queryFn: () => getUsersPaginated(page),
    // })


    // const idd= crypto.randomUUID()


    const queryCl = useQueryClient();
    const mutationDel = useMutation(handleDelete, {
        // queryKey: ['users'],
        onSuccess: () => {
            queryCl.invalidateQueries("users");
        },
        
    });

    return (
        <section className='flex flex-col'>

            <div className="flex justify-between items-center">
                <h1 className='font-bold text-center' >User Lists</h1>
                <Link href={`/create-user`}
                    className='bg-orange-500 text-white my-4 px-4 py-2 rounded-lg text-center '
                >Create User
                </Link>
            </div>


            <ul className='my-4'>
                {data?.map((user: usersType) => (
                    <li key={user.id} className='grid grid-cols-3 gap-4 mb-4'>
                        <p className="flex flex-col">
                            <span className="">{user.name}</span>
                            <span className="">{user.phone}</span>
                        </p>
                        <button
                            // onClick={() => handleDelete(user.id)}
                            onClick={(e) => mutationDel.mutate(user.id)}
                            className='bg-red-500 text-white w-32 px-4 py-2 rounded-lg'
                        >delete</button>
                        <Link href={`/edit/${user.id}`}
                            //  onEdit={onEdit}
                            className='bg-blue-500 text-white w-32 px-4 py-2 rounded-lg text-center'
                        >edit
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <button
                    disabled={page === 1}
                    onClick={prevPage}
                    className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-400" : "bg-blue-400 cursor-pointer"} `}
                >Previous</button>

                <div>Current Page: {page}</div>

                <button
                    disabled={page === 0}
                    onClick={nextPage}
                    className={`px-4 py-2 rounded-lg ${data?.length >= 5 ? "bg-gray-400" : "bg-blue-400 cursor-pointer"} `}
                >Next</button>
            </div>



        </section>

    )

};