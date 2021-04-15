import axios from 'axios';
import { React, useEffect, useState } from 'react'
import UserForm from '../components/UserForm';
import { navigate, Link } from '@reach/router';
import '../css/UserPortal.css';



function UserPortal() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
        .then(res => setUsers(res.data))
    }, []);
    
    if (users == null) return 'Loading...';


    return ( 
        <div>
            <UserForm />


                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th><h4>Select Username:</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr>
                            <td onClick={() => navigate(`/dashboard/${user._id}`)}>{user.username}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default UserPortal
