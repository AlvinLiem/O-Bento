import { useEffect, useState } from "react";
import CardHome from "../components/CardHome";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cuisines, setCuisines] = useState([]);
  const [count, setCount] = useState([]);
  const [search, setSearch] = useState({
    search: "",
    filter: "",
    sort: "",
    pageNumber: "1",
  });

  function handleClickButton(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  }

  function handleSumbit(e) {
    e.preventDefault();
    setSearchParams(search);
  }

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://p2-gc1-restaurant.avprojects.online/pub/cuisines",
        params: search,
      });
      setCount([...Array(Math.ceil(data.count / 10))]);
      setCuisines(data.rows);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (
      search.search !== "" ||
      search.filter !== "" ||
      search.sort !== "" ||
      search.pageNumber !== "1"
    ) {
      setSearchParams(search);
    }
  }, [search]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2 text-center">
          <h1>Welcome to O-Bento</h1>
        </div>

        <div className="row mt2">
          <form
            onSubmit={handleSumbit}
            action=""
            className="d-flex flex-center justify-content-center gap-1"
          >
            <div className="col-6">
              <input
                onChange={handleClickButton}
                type="text"
                className="form-control"
                placeholder="Search by Name"
                name="search"
              />
            </div>
            <div className="col-2">
              <select
                name="sort"
                className="form-select"
                onChange={handleClickButton}
              >
                <option value="">Sort by Date</option>
                <option value="DESC">Newer First</option>
                <option value="ASC">Older First</option>
              </select>
            </div>
            <div className="col-2">
              <select
                name="filter"
                className="form-select"
                onChange={handleClickButton}
              >
                <option value="">All Category</option>
                <option value="1">Set Menu</option>
                <option value="2">Desserts & Beverages</option>
                <option value="3">Snacks</option>
              </select>
            </div>
            <div className="col-1">
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="row mt-2 d-flex justify-content-center">
          <div className="col-8 d-flex flex-wrap gap-1 justify-content-start">
            {cuisines &&
              cuisines.map((cuisine) => {
                return <CardHome cuisine={cuisine} key={cuisine.id} />;
              })}
          </div>
        </div>

        <div className="row m-3 text-center">
          <form className="d-flex flex-row justify-content-center">
            <div>
              <button
                onClick={handleClickButton}
                className="btn btn-sm border-bottom"
                type="input"
                name="pageNumber"
                value={Number(search.pageNumber) - 1}
              >
                Prev
              </button>
            </div>
            {count.map((el, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={handleClickButton}
                    className="btn btn-sm border-bottom"
                    type="input"
                    name="pageNumber"
                    value={index + 1}
                  >
                    {index + 1}
                  </button>
                </div>
              );
            })}
            <div>
              <button
                onClick={handleClickButton}
                className="btn btn-sm border-bottom"
                type="input"
                name="pageNumber"
                value={Number(search.pageNumber) + 1}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
