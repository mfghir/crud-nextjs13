"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGlobalContext } from './Provider';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const EditContactPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();
  const { editId } = useParams()

  const { users, setUsers }=useGlobalContext()
  // console.log("users---",users);

  // console.log("params",params);
  // const editId  = params.id;

  useEffect(() => {
    const fetchContact = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`);
      const data = await response.json();
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
    };

    if (editId) {
      fetchContact();
    }
  }, [editId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: editId,
        name,
        phone,
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json()
    setUsers(data)
    console.log("data---", data);
    // console.log("userData", userData);

    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-gray-200">

      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-y-4 mt-4'>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className='px-2 py-2 rounded-lg' />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required
            className='px-2 py-2 rounded-lg' />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className='px-2 py-2 rounded-lg' />
        </div>
        <button type="submit"
          className='bg-blue-500 text-white px-4 py-2 rounded-lg text-center'
        >Save</button>
      </form>
    </div>
  );
};

export default EditContactPage;