"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  // const pramas = useParams()
  // const searchPramas = useSearchParams()
  // console.log("pramas---", pramas);
  // console.log("searchPramas---", searchPramas);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.log(error));
  };


  const handleCreateUser = async (name: string, email: string) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setContacts((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };


  const handleEdit = async ({ id, name, phone, email }: Contact) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = contacts.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.phone = phone;
            user.email = email;
          }

          return user;
        });

        setContacts((users) => updatedUsers);

      })
      .catch((error) => console.log(error));
  };


  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handlePagination = (page: number) => {
    // router.push(`/?page=${page}`, undefined, { shallow: true });
    router.push(`/?page=${page}`, undefined);
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className='font-bold text-center' >User Lists</h1>
        {/* <Link href={`/create-user`}
          className='bg-orange-500 text-white my-4 px-4 py-2 rounded-lg text-center '
        >Create User
        </Link> */}

        <button
          onClick={() => router.push('/create-user', { handleCreateUser })}
          className='bg-orange-500 text-white my-4 px-4 py-2 rounded-lg text-center '
        >Create User
        </button>
      </div>

      <ul className='my-4'>
        {contacts.map((contact) => (
          <li key={contact.id} className='grid grid-cols-3 gap-4 mb-4'>
            <p className="">{contact.name}</p>
            <button
              onClick={() => handleDelete(contact.id)}
              className='bg-red-500 text-white w-32 px-4 py-2 rounded-lg'
            >delete</button>
            <Link href={`/edit/${contact.id}`}
              className='bg-blue-500 text-white w-32 px-4 py-2 rounded-lg text-center'
            >edit
            </Link>
          </li>
        ))}
      </ul>
      <div className='flex justify-between items-center'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400" : "bg-blue-200"} `}
        >prev page
        </button>
        <button
          disabled={contacts.length === 0}
          onClick={() => handlePagination(currentPage + 1)}
          className={`px-4 py-2 rounded-lg ${contacts.length === 0 ? "bg-gray-400" : "bg-blue-200"} `}
        >next page</button>
      </div>
    </section>
  );
};

export default ContactsPage;