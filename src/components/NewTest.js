"use client";
import { useAllUsers, useDeleteUser } from "../lib/testHooks";
import { useMutation } from 'react-query'

const NewTest = () => {
  const { data: users, isLoading } = useAllUsers();
//   const { remove } = useDeleteUser();

  
const [deleteItem] = useMutation(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
    return res.json()
  }, {
    onSuccess: () => {
      console.log('Item deleted!') 
      // log a success message to the console
    },
  })


  if (isLoading) return <p>loading...</p>;

  return (
    <div className="bg-grey-200">
      {users?.map((user) => {
        return (
          <div className="" key={user.id}>
            <p className="p-2 px-4 text-[13px]">{user.id}</p>
            <p className="p-2 text-[13px]">{user.name}</p>
            <p className="p-2 text-[13px]">{user.email}</p>
            <div className="p-2">
                {/* <button className='bg-blue-400 m-2 p-2 px-4 rounded-md font-semibold text-[12px]' onClick={() => getUpdateData(user)} >Edit</button> */}
                <button
                  className="bg-red-400 m-2 p-2 px-3 rounded-md font-semibold text-[12px]"
                  onClick={() => deleteItem(user.id)}
                >
                  Delete
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewTest;
