"use client";

import { NextPage } from "next";
import Link from "next/link";
import axios from 'axios'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import usePagination from "../Pagination";

import { Dna } from 'react-loader-spinner'

interface userData {
  id: string,
  name: string,
  email: string,
  phone: string
}


const UserListPage: NextPage = () => {
  const queryClient = useQueryClient()
  const { isLoading, data: users, nextPage, prevPage, page } = usePagination();

  //deleting the user
  const { mutate: deleteUser } = useMutation((id: any) => {
    return axios.delete(`${process.env.KEY_APP}/userlist/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['list'])
      toast.success('Successfully Deleted!')
    }
  })


  if (isLoading) {
    // <div className="mx-auto">
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
    {/* </div> */ }
  }


  return (
    <section className='w-full flex flex-col overflow-x-scroll md:overflow-hidden'>

      <div className="flex justify-between items-center w-full">
        <h1 className='font-bold text-center' >User Lists</h1>
        <Link href={`/create-user`}
          className='bg-orange-500 text-white my-4 px-4 py-2 rounded-lg text-center '
        >Create User
        </Link>
      </div>

      <h1 className='text-[21px] text-center m-2'>CURD with React Query</h1>

      <div className="flex flex-col w-full">

        <table className='border-collapse rounded-lg w-full my-6'>
          <thead className='bg-slate-100 rounded-lg '>
            <tr className='text-[15px]  text-left font-light text-slate-600'>
              <th className='p-3 font-md'>Name</th>
              <th className='p-3 font-md'>Email</th>
              <th className='p-3 font-md'>Phone</th>
              <th className='p-3 font-md'>Actions</th>
            </tr>
          </thead>

          <tbody className=''>
            {users?.map((user: userData) => {
              return (
                <tr className='' key={user.id}>
                  <td className='p-2 text-[13px]'>{user.name}</td>
                  <td className='p-2 text-[13px]'>{user.email}</td>
                  <td className='p-2 text-[13px]'>{user.phone}</td>
                  <td className='p-2'>
                    <div>
                      <Link href={`/edit/${user.id}`}>
                        <button className='bg-blue-400 m-2 p-2 px-4 rounded-md font-semibold text-[12px]'>Edit</button>
                      </Link>
                      <button
                        className='bg-red-400 m-2 p-2 px-3 rounded-md font-semibold text-[12px]'
                        onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="flex justify-between items-center w-full">
          <button
            // disabled={currentPage === 1}
            onClick={prevPage} disabled={page === 1}
            className={`px-4 py-2 rounded-lg  font-semibold ${+page === 1 ? "bg-gray-300 cursor-not-allowed text-white" : "bg-blue-400 text-gray-800"} `}
          >
            prev page
          </button>
          <p className="mx-3 text-xl">{page}</p>
          <button
            // disabled={users.length < 10}
            onClick={nextPage}
            className={`px-4 py-2 rounded-lg font-semibold ${users?.length < 10 ? "bg-gray-300 cursor-not-allowed text-white" : "bg-blue-400 text-gray-800"} `}
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



export default UserListPage



