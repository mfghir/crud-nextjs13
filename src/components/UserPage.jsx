"use client"

import React, { useState } from "react";

export default function UserPage({ name,phone, email, id, onEdit, onDelete }){
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(id, evt.target.name.value, evt.target.email.value);
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="Name" name="name" defaultValue={name} />
          <input placeholder="Phone" name="phone" defaultValue={phone} />
          <input placeholder="Email" name="email" defaultValue={email} />
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ) : (
        <div className="user">
          <span className="user-name">{name}</span>
          <span className="user-phone">{phone}</span>
          <span className="user-email">{email}</span>
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
