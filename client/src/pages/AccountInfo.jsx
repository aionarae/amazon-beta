// //create a header for the account info page
// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';

// function AccountInfo () {
//     return (
//         <div className='account-info'>
//         <h1>Account Information</h1>
//         <h2>Username: </h2>
//         <h2>Email: </h2>
//         <h2>Phone Number: </h2>
//         <h2>Address: </h2>
//         </div>
//     )
// }

// export default AccountInfo;

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

function AccountInfo({ userId }) {
  // Check if userId is valid
  if (!userId) {
    return <div>Error: User ID is not provided</div>;
  }

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { user } = data;

  return (
    <div className='account-info'>
      <h1>Account Information</h1>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>
      <h2>Status: {user.status}</h2>
      <h2>Created At: {user.created_at}</h2>
    </div>
  );
}

export default AccountInfo;