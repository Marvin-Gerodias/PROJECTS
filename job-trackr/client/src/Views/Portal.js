import React from 'react'

//css
import '../css/Portal.css'

//components
import NewUser from '../Components/NewUser'
import ExistingUsers from '../Components/ExistingUsers'

function Portal() {
    return (
        <div className="portal__container">

            <div className="comp__container">
                <div className="comp1">
                    <h1>Job Trackr</h1>
                    <p>Keep track of your job applications in one place. Organize information such as company name, when you applied, job title, and so much more.</p>
                    <p style={{fontStyle:"italic", fontWeight:"600"}}>Applying for jobs just got easier!</p>
                </div>
                <div className="comp2">
                    <h2>Let's get started!</h2>
                    <hr/>
                    <ExistingUsers />
                    <hr/>
                    <NewUser />
                </div>

            </div>
        </div>
    )
}

export default Portal
