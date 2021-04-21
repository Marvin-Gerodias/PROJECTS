import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { navigate } from '@reach/router';

function ExistingUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => setUsers(res.data))
    }, []);

    function handleSelect() {
        console.log("/// option selected ///")
        var selectBox = document.getElementById("selectBox");
        selectBox.addEventListener('change', changeFunc);
        function changeFunc() {
            navigate(`/dashboard/${this.value}`);
        }
    }

    function handleDelete(id) {
        console.log("/// user deleted ///", id);
        axios.delete('http://localhost:8000/api/users/' + id)
            .then(() => {
                const filtered = users.filter(user => user.id !== id);
                setUsers(filtered);
            })
    }

    if (users == null) return 'Loading...';

    return (
        <div className="table__container">
                <h4>Already have an account?</h4>
            
                <select id="selectBox" onChange={handleSelect}>
                            <option selected disabled> Select A User</option>
                        {users.map((user, index) => (
                            <option value={user._id}>{user.username}</option>
                            ))}
                </select>
                
                            {/* <table>
                                <tbody>
                                {users.map((user, index) => (
                                        <tr>
                                            <td onClick={() => navigate(`/dashboard/${user._id}`)}>
                                                {user.username}
                                            </td>
                                            <td><button onClick={() => handleDelete(user._id)}>Delete</button></td>
                                        </tr>
                                ))}
                                </tbody>
                            </table> */}
            
        </div>
    )
}

export default ExistingUsers
