import React from 'react';
import UsersList from './components/UsersList';

const USERS = [
  {
    id: 'u1',
    name: 'venky Narra',
    image: '/images/venky.png',
    places: 3
  }
];

const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
