"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateContactPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      }),
    });

    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-gray-200">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-y-4 mt-4' >
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
        >create</button>
      </form>
    </div>
  );
};

export default CreateContactPage;