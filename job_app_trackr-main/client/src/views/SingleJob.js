import React, {useState, useEffect} from 'react';
import '../css/SingleJob.css';
import axios from 'axios';

function SingleJob({props}) {
    const [job, setJob] = useState(null);

    console.log("This is the props.id", props.id)

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + props._id)
            .then(res => setJob(res.data))
    }, []);
    
    console.log('this is the job', job)
    
    return (
        <div>
            <h1></h1>
            
        </div>
    );
}

export default SingleJob;
