// filters js
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {
    locationId: 1,
    locationLabel: 'Hyderabad',
  },
  {
    locationId: 2,
    locationLabel: 'Bangalore',
  },
  {
    locationId: 3,
    locationLabel: 'Chennai',
  },
  {
    locationId: 4,
    locationLabel: 'Delhi',
  },
  {
    locationId: 5,
    locationLabel: 'Mumbai',
  },
]

const FiltersGroup = props => {
  const renderSalaryRangeList = () =>
    salaryRangesList.map(item => {
      const {changeSalaryRange} = props
      const onClickChangeSalaryRange = () =>
        changeSalaryRange(item.salaryRangeId)

      return (
        <li key={item.salaryRangeId} className="filter-item">
          <input
            className="input"
            name="Salary"
            type="radio"
            onClick={onClickChangeSalaryRange}
            id={item.salaryRangeId}
            value={item.label}
          />
          <label className="label" name="Salary" htmlFor={item.salaryRangeId}>
            {' '}
            {item.label}{' '}
          </label>
        </li>
      )
    })

  const renderSalaryRange = () => (
    <>
      <h1 className="heading"> Salary Range </h1>
      <ul className="employment-filters">{renderSalaryRangeList()}</ul>
    </>
  )

  const renderEmploymentFiltersList = () =>
    employmentTypesList.map(item => {
      const {changeEmployType} = props
      const onClickChangeEmploymentType = () =>
        changeEmployType(item.employmentTypeId)

      return (
        <li key={item.employmentTypeId} className="filter-item">
          <input
            className="input"
            type="checkbox"
            onClick={onClickChangeEmploymentType}
            id={item.employmentTypeId}
          />
          <label className="label" htmlFor={item.employmentTypeId}>
            {' '}
            {item.label}{' '}
          </label>
        </li>
      )
    })

  const renderEmploymentFilters = () => (
    <>
      <h1 className="heading"> Type of Employment </h1>
      <ul className="employment-filters">{renderEmploymentFiltersList()}</ul>
    </>
  )

  // new
  const renderLocationsList = () =>
    locationsList.map(item => {
      const {changeLocation} = props
      const onClickChangeLocation = () => {
        changeLocation(item.locationLabel)
      }

      return (
        <li key={item.locationId} className="filter-item">
          <input
            type="checkbox"
            className="input"
            id={item.locationId}
            onClick={onClickChangeLocation}
          />
          <label className="label" htmlFor={item.locationId}>
            {item.locationLabel}
          </label>
        </li>
      )
    })

  const renderLocations = () => (
    <>
      <h1 className="heading"> Loactions </h1>
      <ul className="employment-filters">{renderLocationsList()}</ul>
    </>
  )

  return (
    <div className="filters-group">
      {renderEmploymentFilters()}
      <hr className="hr" />
      {renderSalaryRange()}
      <hr className="hr" />
      {renderLocations()}
    </div>
  )
}

export default FiltersGroup
