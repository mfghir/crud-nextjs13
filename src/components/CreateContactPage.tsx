"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateContactPage = (props: any) => {

  const [data, setData] = useState({
    name: props.dataPost ? props.dataPost.name : "",
    phone: props.dataPost ? props.dataPost.phone : "",
    email: props.dataPost ? props.dataPost.email : ""
  });
  const handleChange = (e: React.FormEvent) => {
    // setData(prevState => ({ ...prevState, [e.target?.name]: e.target?.value }))
    
  }

  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json()).then((json) => console.log(json))

    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-gray-200">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-y-4 mt-4' >
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} required
            className='px-2 py-2 rounded-lg' />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={data.phone} onChange={handleChange} required
            className='px-2 py-2 rounded-lg' />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} required
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