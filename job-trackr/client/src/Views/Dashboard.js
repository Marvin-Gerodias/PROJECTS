import axios from 'axios';
import { React, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/Dashboard.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { navigate } from '@reach/router'


function Dashboard(props) {
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + props.id)
            .then(res => setUser(res.data))
    }, [user]);

    function submitHandler(e) {
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

    function handleDelete(id) {
        console.log('id was clicked', user.jobs[id]);
        user.jobs.splice(id, 1);
        setUser(user.jobs[id]);
    }

    if (user == null) return 'Loading';

    return (
        <div className='wrapper__'>

            <div className='main__'>

                <div className='main__header'>
                    <h1>JobTrackr</h1>
                    <div className='main__user'>
                        <h5>Signed in as: <span style={{color:"gray", fontStyle: "italic"}}>{user.username}</span></h5>
                        <button type="button" class="btn btn-primary" onClick={() => navigate('/portal')}>Logout</button>
                    </div>
                </div>
            <hr/>

                <div className='main__body'>
                    {user.jobs.length === 0 
                    
                    ? 

                    <div className='main__noJob'>
                        <h3>No jobs yet. Let's add some!</h3>
                        <button type="button" class="btn btn-success" onClick={handleShow}>Add a Job</button>
                        
                        <Modal className='modal' show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title style={{fontFamily: 'Montserrat, sans-serif'}}>Add A Job</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <form onSubmit={submitHandler} className="main_form">

                                        <div className="form_box">
                                            <div className="left_box">


                                                <p><input type="text" class="form-control" name="companyName" placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="jobTitle" placeholder="Job Title" onChange={(e) => setJobTitle(e.target.value)} /></p>

                                                <p><input type="date" class="form-control" name="dateApplied" placeholder="Date Applied" onChange={(e) => setDateApplied(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="salaryRange" placeholder="Salary Range" onChange={(e) => setSalaryRange(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="jobLevel" placeholder="Job Level" onChange={(e) => setJobLevel(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="jobDescription" placeholder="Job Description" onChange={(e) => setJobDescription(e.target.value)} /></p>
                                            </div>

                                            <div className="right_box">

                                                <p><input type="text" class="form-control" name="companyDescription" placeholder="Company Description" onChange={(e) => setCompanyDescription(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="status" placeholder="Application Status" onChange={(e) => setStatus(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="applicationSite" placeholder="Application Site" onChange={(e) => setApplicationSite(e.target.value)} /></p>

                                                <p><input type="text" class="form-control" name="resume" placeholder="Resume" onChange={(e) => setResume(e.target.value)} /></p>

                                                <p><textarea type="text" class="form-control" name="notes" placeholder="Extra Notes" onChange={(e) => setNotes(e.target.value)} /></p>

                                                <button type="submit" className="btn btn-success" style={{marginRight:'15px'}}>Add Job</button>
                                                <button className='btn btn-danger' onClick={handleClose}>Close</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </Modal.Body>

                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    
                    : 
                    <>
                    <div className='main__tableHeader'>
                        <div className='main__job'><p>Job:</p></div>
                        <div className='main__description'><p>Description:</p></div>
                    </div>
                    

                    <div className='main__data'>
                        <Tabs>
                            <TabList>
                                    {user.jobs.map((job, index) => {
                                        return(
                                                <Tab>
                                                    <div>
                                                        {job.companyName} 
                                                    </div>
                                                </Tab>
                                        )
                                    })}

                            </TabList>

                                <h3>
                                    {user.jobs.map((job, index) => {
                                        return(
                                            <TabPanel>
                                                <div>
                                                    <label>Company:</label>
                                                    <p>{job.companyName}</p>
                                                    <label>Date Applied:</label>
                                                    <p>{job.dateApplied}</p>
                                                    <label>Job Title:</label>
                                                    <p>{job.jobTitle}</p>
                                                    <label>Salary Range:</label>
                                                    <p>{job.salaryRange}</p>
                                                    <label>Location:</label>
                                                    <p>{job.location}</p>
                                                    <label>Job Level:</label>
                                                    <p>{job.jobLevel}</p>
                                                </div>
                                                <div>
                                                    <label>Job Description:</label>
                                                    <p>{job.jobDescription}</p>
                                                    <label>Company Description:</label>
                                                    <p>{job.companyDescription}</p>
                                                    <label>Application Site:</label>
                                                    <p>{job.applicationSite}</p>
                                                    <label>Resume:</label>
                                                    <p>{job.resume}</p>
                                                    <label>Status:</label>
                                                    <p>{job.status}</p>
                                                    <label>Additional Notes:</label>
                                                    <p>{job.notes}</p>
                                                </div>
                                                </TabPanel>
                                            )
                                        })}
                                </h3>

                        </Tabs>
                    </div>
                    <div className='add__job'>
                        <button type="button" class="btn btn-success" onClick={handleShow}><AddCircleOutlineIcon/> New Job</button>
                                <Modal className='modal' show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title style={{fontFamily: 'Montserrat, sans-serif'}}>Add A Job</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div>
                                            <form onSubmit={submitHandler} className="main_form">

                                                <div className="form_box">
                                                    <div className="left_box">


                                                        <p><input type="text" class="form-control" name="companyName" placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="jobTitle" placeholder="Job Title" onChange={(e) => setJobTitle(e.target.value)} /></p>

                                                        <p><input type="date" class="form-control" name="dateApplied" placeholder="Date Applied" onChange={(e) => setDateApplied(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="salaryRange" placeholder="Salary Range" onChange={(e) => setSalaryRange(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="jobLevel" placeholder="Job Level" onChange={(e) => setJobLevel(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="jobDescription" placeholder="Job Description" onChange={(e) => setJobDescription(e.target.value)} /></p>
                                                    </div>

                                                    <div className="right_box">

                                                        <p><input type="text" class="form-control" name="companyDescription" placeholder="Company Description" onChange={(e) => setCompanyDescription(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="status" placeholder="Application Status" onChange={(e) => setStatus(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="applicationSite" placeholder="Application Site" onChange={(e) => setApplicationSite(e.target.value)} /></p>

                                                        <p><input type="text" class="form-control" name="resume" placeholder="Resume" onChange={(e) => setResume(e.target.value)} /></p>

                                                        <p><textarea type="text" class="form-control" name="notes" placeholder="Extra Notes" onChange={(e) => setNotes(e.target.value)} /></p>

                                                        <button type="submit" className="btn btn-success" style={{marginRight:'15px'}}>Add Job</button>
                                                        <button className='btn btn-danger' onClick={handleClose}>Close</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </Modal.Body>

                                    <Modal.Footer>
                                    </Modal.Footer>
                                </Modal>
                    </div>
                    </>
                    }
                    


                </div>

            </div>
        </div>
    )
}

export default Dashboard
