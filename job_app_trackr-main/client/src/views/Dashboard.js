import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { useParams } from 'react-router-dom';
import '../css/SingleJob.css';
import JobForm from '../components/JobForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/Dashboard.css'


import styled from 'styled-components'
import{IconContext} from 'react-icons'
import{FiPlus, FiMinus} from 'react-icons/fi'

const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 50vh;

`;

const Container = styled.div`
    position: absolute;
    top: 1rem;
    width: 80vw;
`;

const Wrap = styled.div`
    background-color: rgb(246, 246, 246);
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 6vh;
    text-align: center;
    cursor: pointer;



    h1 {
        padding: 2rem;
        font-size: 1.5rem;
    }

    span {
        margin-right: 1.5rem;
    }
`;

const Dropdown = styled.div`
    background-color: rgb(246, 246, 246);
    color: gray;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: white;
    border-top: white;
    transition: height 0.4s;

    :active {
        height: 200px;
    }

    p {
        font-size: 1.5rem;
    }

`;


const Dashboard = (props) => {
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

////////////////////////////////////////////////////////////////////

    const[clicked, setClicked] = useState(false);

    const toggle = index => {
        if(clicked === index) {
            //if clicked is already active, close it
            return setClicked(null)
        }
        setClicked(index)
    }

////////////////////////////////////////////////////////////////////

    console.log(props.id)

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + props.id)
            .then(res => setUser(res.data))
    }, []);


    function submitHandler(e) {
        // e.preventDefault(); // refreshes the screen, shows added jobs, and clears the form
        console.log("from modal window")
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


    if (user == null) return 'Loading';

    var acc = document.getElementsByClassName("accordion");
    console.log(acc);
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }




    return (
        <div>
            <h1>My Dashboard</h1>

            <Button variant="primary" onClick={handleShow}>
                Add Job
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add A Job</Modal.Title>
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

                                    <button type="submit" className="btn btn-outline-primary">Add Job</button>
                                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>



            <hr />
            <h2>{user.username}</h2>




            {/* {user.jobs.map((job, index) => (
                <div>
                    <button className="accordion">{job.companyName}</button>
                    <div className="panel">
                        <h3>{job.companyName}</h3>
                    </div>
                </div>
            ))} */}

            <IconContext.Provider value = {{color: '#00FFB9', size: '25px'}}>

                <AccordionSection>
                    <Container>
                        {user.jobs.map((job, index) => {
                            return (
                                <>
                                    <Wrap onClick = {() => toggle(index)} key = {index}>
                                        <h1>{job.companyName}</h1>
                                        <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                                    </Wrap>
                                    {clicked === index ? (
                                    <Dropdown>
                                        <p>{job.location}</p>
                                    </Dropdown>
                                    ) : null}
                                </>
                            )
                        })}
                    </Container>
                </AccordionSection>
            
            </IconContext.Provider>




        </div>

    )

}

export default Dashboard;