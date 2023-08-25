import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
    const {details} = props
    
    const {companyLogoUrl,
            employmentType,
            jobDescription,
            id,
            rating,
            location,
            title} = details

    return(
        <li className="similar-job-item-container">
            <div className="job-details">
                <img src={companyLogoUrl} 
                    alt="similar job company logo" className="company-logo" />
                <div className="job-role-rating-container">
                    <h1 className="job-title"> {title} </h1>
                    <div className="rating-container">
                        <AiFillStar className="star-icon" />
                        <p className="job-rating"> {rating} </p>
                    </div>
                </div>
            </div>
            <div className="description-container">
                <h1 className="job-description-text"> Description </h1>
                
            </div>
            <p className="job-description"> {jobDescription} </p>
             <div className="location-package-details">
                    <div className="location-employment-container">
                        <div className="location-container">
                            <MdLocationOn className="location-icon" />
                            <p className="location"> {location} </p>
                        </div>
                        <div className="location-container">
                            <BsFillBriefcaseFill className="location-icon" />
                            <p className="location"> {employmentType} </p>
                        </div>
                    </div>
                </div>
        </li>
    )
}

export default SimilarJobs