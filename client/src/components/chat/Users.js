import React, { Component } from 'react';
import "./Users.css";

const Users = ({ users }) => {
    return ( <div className="users">
        {users.join(", ")}
    </div> );
}
 
export default Users;