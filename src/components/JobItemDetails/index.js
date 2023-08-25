import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'


const apiStatusConstants = {
    initial: 'INITITAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}

class JobItemDetails extends Component{
    state = {
        apiStatus: apiStatusConstants.inProgress,
        jobDetailsData: {},
        jobSkills: [],
        jobLifeAtCompany: {},
        similarJobs: []
    }


    componentDidMount(){
        this.getJobItemDetails()
    }

    getJobItemDetails = async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})

        const {match} = this.props
        const {params} = match
        const {id} = params

        const jwtToken = Cookies.get("jwt_token")

        const apiUrl = `https://apis.ccbp.in/jobs/${id}`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(apiUrl, options)
        if(response.ok === true){
            const data = await response.json()
            const updatedJobDetailsData = {
                id: data.job_details.id,
                companyLogoUrl: data.job_details.company_logo_url,
                companyWebsiteUrl: data.job_details.company_website_url,
                employmentType: data.job_details.employment_type,
                jobDescription: data.job_details.job_description,
                location: data.job_details.location,
                packagePerAnnum: data.job_details.package_per_annum,
                rating: data.job_details.rating,
                title: data.job_details.title
            }

            
            const updatedJobSkills = data.job_details.skills.map(item => ({
                imageUrl: item.image_url,
                name: item.name
            }))

            const updatedLifeAtCompany = {
                description: data.job_details.life_at_company.description,
                imageUrl: data.job_details.life_at_company.image_url
            }
            
            const similarJobsData = data.similar_jobs.map(item => ({
                companyLogoUrl: item.company_logo_url,
                employmentType: item.employment_type,
                jobDescription: item.job_description,
                id: item.id,
                rating: item.rating,
                location: item.location,
                title: item.title
            }))

            

            this.setState({
                apiStatus: apiStatusConstants.success,
                jobDetailsData: updatedJobDetailsData,
                jobSkills: updatedJobSkills,
                jobLifeAtCompany: updatedLifeAtCompany,
                similarJobs: similarJobsData
            })
        }
        else{
            this.setState({apiStatus: apiStatusConstants.failure})
        }
       
    }

    renderJobDetailsContent = () => {
        const {jobDetailsData} = this.state
        
        const { id, companyLogoUrl, employmentType, 
            jobDescription, location, packagePerAnnum, title, rating, companyWebsiteUrl } = jobDetailsData
        return(
            <>
            <div className="job-details">
                <img src={companyLogoUrl} 
                    alt="job details company logo" className="company-logo" />
                <div className="job-role-rating-container">
                    <h1 className="job-title"> {title} </h1>
                    <div className="rating-container">
                        <AiFillStar className="star-icon" />
                        <p className="job-rating"> {rating} </p>
                    </div>
                </div>
            </div>
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
                    <p className="package"> {packagePerAnnum} </p>
                </div>
                <hr className="horizontal-line" />
                <div className="description-container">
                    <h1 className="job-description-text"> Description </h1>
                    <a href={companyWebsiteUrl} target="_blank">
                        <p className="visit"> Visit </p>
                        <BsBoxArrowUpRight className="visit-logo" />
                    </a>
                </div>
                <p className="job-description"> {jobDescription} </p>
            </>
        )
    }

    renderSkills = item => {
        const {jobSkills} = this.state
        
        return(
            <li key={item.name} className="skill-item">
                <img src={item.imageUrl} alt={item.name} className="skill-img" />
                <p className="skill-text"> {item.name} </p>
            </li>
        )
    }

    renderLifeAtCompany = () => {
        const {jobLifeAtCompany} = this.state
       
        return(
            <div className="life-at-company">
                <p className="life-at-company-text"> {jobLifeAtCompany.description} </p>
                <img className="life-at-company-img" src={jobLifeAtCompany.imageUrl} alt="life at company" />
            </div>
        )
    }

    renderLoader = () => {
        return(
            <div className="loader-jobs-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
        )
    }

    renderJobItemDetails = () => {
        const {jobDetailsData, jobSkills, jobLifeAtCompany, similarJobs} = this.state
        
        return(
            <div className="job-item-bg-container">
                <div className="job-item-responsive-container">
                    {this.renderJobDetailsContent()}
                    <h1 className="skills-heading"> Skills </h1>
                    <ul className="skills-list">
                        {jobSkills.map(item => this.renderSkills(item))}
                    </ul>
                    <h1 className="life-at-company-heading"> Life At Company </h1>
                    {this.renderLifeAtCompany()}
                </div>
                <div className="similar-jobs-container">
                    <h1 className="similar-jobs-heading"> Similar Jobs </h1>
                    <ul className="similar-jobs-lists">
                        {similarJobs.map(item => <SimilarJobs key={item.id} details={item} />)}
                    </ul>
                </div>
            </div>
        )
    }

    retryGetJobDetails = () => {
        this.getJobItemDetails()
    }

    failureView = () => {
        return(
            <div className="jobs-failure-container">
                <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" 
                    alt="failure view" className="jobs-faliure-img" />
                <h1 className="jobs-failure-heading"> Oops! Something Went Wrong </h1>
                <p className="jobs-failure-text"> We cannot seem to find the page you are looking for</p>
                <button type="button" className="jobs-retry-btn" onClick={this.retryGetJobDetails}> Retry </button>
            </div>
        )
    }

    renderContent = () => {
        const {apiStatus} = this.state

        switch(apiStatus){
            case (apiStatusConstants.inProgress):
                return this.renderLoader()
            case (apiStatusConstants.success):
                return this.renderJobItemDetails()
            case (apiStatusConstants.failure):
                return this.failureView()
            default:
                return null
        }
    }


    render(){
        const {jobDetailsData, jobSkills, jobLifeAtCompany} = this.state
        return(
            <>
                <Header/>
                {this.renderContent()}
            </>
        )
    }
}

export default JobItemDetails