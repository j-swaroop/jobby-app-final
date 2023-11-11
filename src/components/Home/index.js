// home js
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickJobsBtn = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="responsive-home-container">
          <h1 className="home-heading"> Find The Job That Fits Your Life </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilites and potential.
          </p>
          <Link className="link-item" to="/jobs">
            <button
              className="find-jobs-btn"
              onClick={onClickJobsBtn}
              type="button"
            >
              {' '}
              Find Jobs{' '}
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
