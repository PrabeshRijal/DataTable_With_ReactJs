import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './components/Table';

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(4);

  const sortOptions = ["name", "email", "phone", "address", "status"]

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users?q=${value}`);
      setData(res.data);
      setValue("");
    } catch (err) {
      console.log(err);
    }
  }

  const handleReset = () => {
    loadUserData(0, 4, 0);
  }

  const handleSort = async (e) => {
    const val = e.target.value;
    setSortValue(val);
    try {
      const res = await axios.get(`http://localhost:5000/users?_sort=${val}&_order=asc`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFilter = async (val) => {
    try {
      const res = await axios.get(`http://localhost:5000/users?status=${val}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const loadUserData = async (start, end, increase) => {
    try {
      const res = await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`);
      setData(res.data);
      setCurrentPage(currentPage + increase);
    } catch (err) {
      console.log(err);
    }
  }

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <>
          <ul>
            <li>{currentPage}</li>
            <li><button onClick={() => loadUserData(4, 8, 1)}>Next</button></li>
          </ul>
        </>
      )
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <ul>
          <li><button onClick={() => loadUserData((currentPage - 1) * 4, currentPage * 4, -1)}>Prev</button></li>
          <li>{currentPage + 1}</li>
          <li><button onClick={() => loadUserData((currentPage + 1) * 4, (currentPage + 2) * 4, 1)}>Next</button></li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li><button onClick={() => loadUserData((currentPage - 1) * 4, currentPage * 4, -1)}>Prev</button></li>
          <li>{currentPage + 1}</li>
        </ul>
      )
    }
  }

  useEffect(() => {
    loadUserData(0, 4, 0);
  }, []);
  return (
    <section className="global-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xl-12 col-lg-12">
            <h3 className="global-heading">DATA TABLE WITH REACT JS</h3>
            {/* search-input::begin */}
            <div className="search-parent-wrapper">
              <div className="search-childs">
                <input
                  type="text"
                  placeholder="Search Here..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => handleSearch()}>SEARCH</button>
                <button onClick={() => handleReset()} className="reset-btn">RESET</button>
              </div>
              <div className="search-childs">
                <select
                  value={sortValue}
                  onChange={(e) => handleSort(e)}
                >
                  <option value="">Please Select Value</option>
                  {
                    sortOptions && sortOptions.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))
                  }
                </select>
              </div>
              <div className="search-childs">
                <h3>Filter By Status</h3>
                <button onClick={() => handleFilter("active")} className="button-only button-active">Active</button>
                <button onClick={() => handleFilter("inactive")} className="button-only button-inactive">Inactive</button>
              </div>
            </div>
            {/* search-input::end */}
            <div className="line-break"></div>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>
                {
                  data && data.length === 0 ? (
                    <h6 className="mt-3">No Data Found</h6>
                  ) : (
                    data && data.map((data, index) => (
                      <Table key={index} data={data} index={index} />
                    ))
                  )
                }
              </tbody>
            </table>
            <div className="pagination">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App;