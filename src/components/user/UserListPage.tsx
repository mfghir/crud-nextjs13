"use client";


// pages/users/index.tsx
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../context/UserContext';

const UserListPage = () => {
  const { state,dispatch ,currentPageUsers } = useContext(UserContext);
  const router = useRouter();

  const handleDeleteUser = (editId: number) => {
    dispatch({ type: 'DELETE_USER', payload: editId });
  };

  const handleEditUser = (editId: number) => {
    router.push(`/edit/${editId}`);
  };

  const handleCreateUser = () => {
    router.push('/create-user');
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (page: number) => {
    // router.push(`/?page=${page}`, undefined, { shallow: true });
    router.push(`/?page=${page}`, undefined);
    setCurrentPage(page);
  };


  

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">User List</h1>
      <div className="mb-4">
        <button
          onClick={handleCreateUser}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create New User
        </button>
      </div>
      <div className="space-y-4">
        {currentPageUsers.map((user:any) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded"
          >
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditUser(user.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between items-center'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400" : "bg-blue-200"} `}
        >prev page
        </button>
        <button
          disabled={currentPageUsers.length === 0}
          onClick={() => handlePagination(currentPage + 1)}
          className={`px-4 py-2 rounded-lg ${currentPageUsers.length ===0 ? "bg-gray-400" : "bg-blue-200"} `}
        >next page</button>
      </div>
    
    </div>
  );
};

export default UserListPage;