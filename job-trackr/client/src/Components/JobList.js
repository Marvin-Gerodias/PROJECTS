import { React, useState, useEffect } from 'react'
import axios from 'axios';

function JobList(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + props.id)
            .then(res => setUser(res.data))
    }, []);

    if (user == null) return 'Loading';


    return (
        <div>
            {user.jobs.map((job, index) => {
                return(
                    <div>
                        <h1>{job.companyName}</h1>
                        <h1>{job.date}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default JobList
