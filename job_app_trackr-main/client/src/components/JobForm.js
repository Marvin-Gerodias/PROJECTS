import React, {useState} from 'react';
import axios from 'axios';


const JobForm = (props) => {
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [location, setLocation] = useState("")
    const [jobLevel, setJobLevel] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [notes, setNotes] = useState("");
    const [applicationSite, setApplicationSite] = useState("");
    const [resume, setResume] = useState("");
    const [status, setStatus] = useState("");



    function submitHandler(e) {
        // e.preventDefault(); // refreshes the screen, shows added jobs, and clears the form
        console.log("Hello")
        axios.post(`http://localhost:8000/api/users/${props.id}/jobs`, {
            companyName,
            jobTitle,
            dateApplied,
            salaryRange,
            location,
            jobLevel,
            jobDescription,
            companyDescription,
            notes,
            applicationSite,
            resume,
            status
        })
        .then(res => console.log(`Response: ${res.data}`))
        .catch(err => console.log(`Error: ${err}`))
    }




    return (
        <div>
            <form onSubmit={submitHandler} className="main_form">
            
                <div className="form_box">
                    <div className="left_box mb-3">
                    <h4>Add a new job!</h4>

                        <p><input type="text" class="form-control" name="companyName" placeholder = "Company Name" onChange={(e) => setCompanyName(e.target.value)} /></p>

                        <p><input type="text" class="form-control" name="jobTitle" placeholder = "Job Title" onChange={(e) => setJobTitle(e.target.value)}/></p>

                        <p><input type="date" class="form-control" name="dateApplied" placeholder = "Date Applied" onChange={(e) => setDateApplied(e.target.value)} /></p>

                        <p><input type="text" class="form-control" name="salaryRange" placeholder = "Salary Range" onChange={(e) => setSalaryRange(e.target.value)} /></p>

                        <p><input type="text" class="form-control" name="location" placeholder = "Location" onChange={(e) => setLocation(e.target.value)}/></p>

                        <p><input type="text" class="form-control" name="jobLevel" placeholder = "Job Level" onChange={(e) => setJobLevel(e.target.value)} /></p>
                        
                        <p><input type="text" class="form-control" name="jobDescription" placeholder = "Job Description" onChange={(e) => setJobDescription(e.target.value)} /></p>
                    </div>
                    
                    <div className="right_box mb-3">    

                        <p><input type="text" class="form-control" name="companyDescription" placeholder = "Company Description" onChange={(e) => setCompanyDescription(e.target.value)}/></p>

                        <p><input type="text" class="form-control" name="status" placeholder = "Application Status" onChange={(e) => setStatus(e.target.value)} /></p>

                        <p><input type="text" class="form-control" name="applicationSite" placeholder = "Application Site" onChange={(e) => setApplicationSite(e.target.value)}/></p>

                        <p><input type="text" class="form-control" name="resume" placeholder = "Resume" onChange={(e) => setResume(e.target.value)} /></p>

                        <p><textarea type="text" class="form-control" name="notes" placeholder = "Extra Notes" onChange={(e) => setNotes(e.target.value)} /></p>
                        
                        <button className="btn btn-outline-primary">Add Job</button>
                    </div>
                </div>
                {/* <div className="status_box">
                    {/* <div className="job_status">
                        <label>Status:</label>
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="Heard Back">Heard Back 😄</option>
                            <option value="Haven't heard Back">Haven't heard back 🙁</option>
                        </select>
                    </div> */}
                    
                {/* </div> */} 
            </form>
        </div>
    );
}

export default JobForm;
