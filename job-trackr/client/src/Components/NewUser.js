import { React, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

function NewUser() {
    const [username, setUsername] = useState({});

    function submitHandler(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users', {
            username,
        })
        .then(res => navigate(`/dashboard/${res.data._id}`, username))
        .catch(err => console.log(`Error: ${err}`))
    }

    return (
        <div className = "newuser__container">
            <form onSubmit={submitHandler}>
                    <h4>Are you a new user? </h4><br/>
                    <input name="username" type="text" placeholder="Enter A Username" class="form-control" onChange={(e) => setUsername(e.target.value)}/><br/><br/>
                    <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default NewUser
