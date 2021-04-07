import axios from 'axios';
import { React, useEffect, useState } from 'react'
import UserForm from '../components/UserForm';
import { navigate, Link } from '@reach/router';



function UserPortal() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
        .then(res => setUsers(res.data))
    }, []);
    
    if (users == null) return 'Loading...';


    return ( 
        <div>
            <UserForm /><br/>

            <h3> OR </h3>
            <h4>Select Your Username:</h4>

            {users.map((user, index) => (
                <h3> <Link to={`/dashboard/${user._id}`}> {user.username} </Link></h3>
            ))}


            

        </div>
    )
}

export default UserPortal
