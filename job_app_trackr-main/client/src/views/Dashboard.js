import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { useParams } from 'react-router-dom';


import JobForm from '../components/JobForm';

const Dashboard = (props) => {
    const [user, setUser] = useState(null);

    console.log(props.id)

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + props.id)
            .then(res => setUser(res.data))
    }, []);
    

    if (user == null) return 'Loading...';
    
    return (
        <div>
            <JobForm id={props.id}/>
            <hr />
            <h2>{user.username}</h2>
            {user.jobs.map((job, index) => (
                <ul>
                    <li>{job.companyName}</li>
                </ul>
    ))}
        </div>
    )
}

export default Dashboard;

{/* {users.map((user, idx) => (
                
                <div key={idx}>
                    <h2>{user.username}</h2>
                    <h2>{user.jobs[0].companyName}</h2>

                    
                    {
                        user.jobs.map((key, i) => {
                            <div key={i}>

                                <ul>
                                    <li key={i}>{key.companyName}</li>
                                    <li key={i}>{key.jobTitle}</li>

                                </ul>

                            </div>
                            
                        })
                    }

                </div>
            ))} */}