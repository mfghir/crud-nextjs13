"use client";

import React, { useEffect, useState } from "react";
import UserPage from "./UserPage";
import AddUserPage from "./AddUserPage";
// import  User  from "./User";
// import  AddUser  from "./AddUser";

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=5`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        id: Date.now() ,
        name: name,
        email: email,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (id, name, phone, email) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
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
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.phone = phone;
            user.email = email;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
    // router.push(`/?page=${page}`, undefined, { shallow: true });
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <AddUserPage onAdd={onAdd} />
      <ul className="my-4">
        {users.map((user) => (
          <UserPage
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-200"
          } `}
        >
          prev page
        </button>
        <button
          disabled={users.length === 0}
          onClick={() => handlePagination(currentPage + 1)}
          className={`px-4 py-2 rounded-lg ${
            users.length  ? "bg-gray-400" : "bg-blue-200"
          } `}
        >
          next page
        </button>
      </div>
    </div>
  );
}
