import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CuisinesListPage() {
  const [cuisineData, setCuisineData] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://p2-gc1-restaurant.avprojects.online/cuisines",
        headers: {
          authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      data.sort((a, b) => a.id - b.id);
      setCuisineData(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  async function handleDelete(id) {
    try {
      await axios({
        method: "delete",
        url: `https://p2-gc1-restaurant.avprojects.online/cuisines/${id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
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
  }, [handleDelete]);
  return (
    <>
      <div className="col-10 bg-light rounded-end-4">
        <div className="row ">
          <h2 className="text-center border-bottom">All Cuisines</h2>
          <div>
            <table className="table table-hover text-center text wrap">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category Id</th>
                  <th scope="col">Author Id</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cuisineData &&
                  cuisineData.map((cuisine) => {
                    return (
                      <tr key={cuisine.id}>
                        <th scope="row">{cuisine.id}</th>
                        <td>{cuisine.name}</td>
                        <td>{cuisine.description}</td>
                        <td>{cuisine.price}</td>
                        <td>{cuisine.categoryId}</td>
                        <td>{cuisine.authorId}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Actions
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <Link
                                  to={`/details/${cuisine.id}`}
                                  className="dropdown-item"
                                >
                                  Details
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/edit/${cuisine.id}`}
                                  className="dropdown-item"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleDelete(cuisine.id);
                                  }}
                                  className="dropdown-item"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
