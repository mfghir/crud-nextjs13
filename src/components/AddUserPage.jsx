"use client"

import React from "react";

export default function AddUserPage({ onAdd }) {
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onAdd(evt.target.name.value,evt.target.phone.value, evt.target.email.value);
    evt.target.name.value = "";
    evt.target.phone.value = "";
    evt.target.email.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>Add User</h3>
      <input placeholder="Name" name="name" />
      <input placeholder="Phone" name="phone" />
      <input placeholder="Email" name="email" />
      <button onSubmit={handleOnSubmit}>Add</button>
      <hr />
    </form>
  );
};
