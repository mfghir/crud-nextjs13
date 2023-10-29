"use client";

import { NextPage } from "next";
import Link from "next/link";
import axios from 'axios'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import usePagination from "../Pagination";

interface userData {
  id: string,
  name: string,
  email: string,
  phone: string
}


const UserListPage: NextPage = () => {
  const queryClient = useQueryClient()

  // const fetchUsers = async () => {
  //   return await axios.get(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist?_page=${currentPage}&_limit=10`)
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       console.log("err", err);
  //       throw err;
  //     });
  // }


  const { isLoading, data: users, nextPage, prevPage, page } = usePagination();

  //fetching the data
  // const { data: users, isLoading } = useQuery<userData[]>(["list"], fetchUsers)
  // console.log("users", users);

  //deleting the user
  const { mutate: deleteUser } = useMutation((id: any) => {
    return axios.delete(`https://652e19eff9afa8ef4b280a1d.mockapi.io/list/userlist/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['list'])
      toast.success('Successfully Deleted!')
    }
  })


  if (isLoading) return <h1>Data is Loading</h1>


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
                        <button className='bg-blue-400 m-2 p-2 px-4 rounded-md font-semibold text-[12px]'>Edit</button>
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

        <div className="flex justify-between items-center w-full">
          <button
            // disabled={currentPage === 1}
            onClick={prevPage} disabled={page === 1}
            className={`px-4 py-2 rounded-lg  font-semibold ${+page === 1 ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-400 text-gray-800"} `}
          >
            prev page
          </button>
          <p className="mx-3 text-xl">{page}</p>
          <button
            // disabled={users.length === 0}
            onClick={nextPage}
            className={`px-4 py-2 rounded-lg font-semibold ${users?.length >= 10 ? "bg-blue-400 text-gray-800" : "bg-gray-300 cursor-not-allowed text-white "} `}
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



