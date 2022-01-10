import React, {useEffect, useState} from 'react'
import ReferralForm from './ReferralForm'
import axios from 'axios'
import LevelData from "./LevelData"
import Swal from 'sweetalert2'
import Pagination from 'react-rails-pagination'
const Referral = (props) => {
  const [user, setUser] = useState(0);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [level, setLevel] = useState({ option: "levelone"});
  const [levels, setLevels] = useState({});
  const [loaded, setLoaded] = useState(false)


  const changeOption = (newOption) => {
      setLevel({ option: newOption })
    }

  function levelchange(){
    axios.get(`/api/v1/${level.option}.json?page=${currentPage}`).then((resp) => {
      setTotalPages(resp.data.pages)
      setLevels(resp.data.main)
      setLoaded(true)
    }).catch( data => console.log('Error', data))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    levelchange()
  }

  useEffect(()=> {
    levelchange()
    }, [])
  let levelsdata
    if(loaded && levels.data){
      levelsdata = levels.data.map((item, index) => {
        return(
          <LevelData
            key={index}
            attributes={item.attributes}
          />
      )
    })
  }
  const handleChangePage = (currentPage) => {  // Required as a prop to update data in your table.
        setPage(parseInt(currentPage)) // Update Current Page
        levelchange()// Fetch Data for the new page
      }
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row mt-5">
        <h1>Referral Program</h1>
            <div className="col-md-4">
                <ReferralForm
                  changeOption={changeOption}
                  handleSubmit={handleSubmit}
                  level={level}
                />
            </div>
            <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">List of Downline Users</h5>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Registered @</th>
                          </tr>
                        </thead>
                        <tbody>
                          {levelsdata}
                        </tbody>
                      </table>
                    </div>
                </div>
                <div className="card-footer">
                  <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} hideEndArrows={true}/>
                </div>
            </div>
            </div>
        </div>
      </div>
      <br/><br/><br/>
    </div>
  )
}

export default Referral
