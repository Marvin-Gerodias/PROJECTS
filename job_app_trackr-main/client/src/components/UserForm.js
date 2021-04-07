import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

function UserForm() {
    // const [user, setUser] = useState({})
    const [username, setUsername] = useState({});
    
    function submitHandler(e) {
        e.preventDefault();

        axios.post(`http://localhost:8000/api/users`, {
            username,
        })
        .then(response => navigate(`/dashboard/${response.data._id}`, username))
        
        .catch(err => console.log(`Error: ${err}`))
        
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h2>Enter a New Username: </h2><br/>
                <input name="username" type="text" placeholder="username" class="form-control" onChange={(e) => setUsername(e.target.value)}/><br/><br/>
                <button className="btn btn-primary btn-sm">Create User</button>
            </form>
        </div>
    )
}

export default UserForm;
