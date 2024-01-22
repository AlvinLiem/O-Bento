import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function CuisineDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleCuisine, setSingleCuisine] = useState({});
  const [file, setFile] = useState(null);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://p2-gc1-restaurant.avprojects.online/cuisines/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setSingleCuisine(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  function handleFileChange(e) {
    const image = e.target.files[0];
    setFile(image);
  }

  async function handleSumbitFile(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(`imgUrl`, file);

      await axios({
        method: "patch",
        url: `https://p2-gc1-restaurant.avprojects.online/cuisines/${id}/image`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
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

  async function handleDelete() {
    try {
      await axios({
        method: "delete",
        url: `https://p2-gc1-restaurant.avprojects.online/cuisines/${id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      navigate(`/`);
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
  }, [handleSumbitFile]);

  return (
    <>
      <div className="col-10 bg-light rounded-end-4">
        <div className="row ">
          <h2 className="text-center border-bottom">Cuisines Details</h2>
          <div className="d-flex gap-1">
            <div
              className="card me-0 m-3 p-3"
              style={{ width: "30rem", height: "auto" }}
            >
              <img
                src={singleCuisine.imgUrl}
                className="card-img "
                alt="Food Image"
              />
            </div>
            <div
              className="card ms-0 m-3 p-3"
              style={{ width: "30rem", height: "auto" }}
            >
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">ID: {singleCuisine.id}</li>
                  <li className="list-group-item">
                    Name: {singleCuisine.name}
                  </li>
                  <li className="list-group-item">
                    Description: {singleCuisine.description}
                  </li>
                  <li className="list-group-item">
                    Price: {singleCuisine.price}
                  </li>
                  <li className="list-group-item">
                    Image URL: {singleCuisine.imgUrl}
                  </li>
                  <li className="list-group-item">
                    Category ID: {singleCuisine.categoryId}
                  </li>
                  <li className="list-group-item">
                    Author ID: {singleCuisine.authorId}
                  </li>
                  <li className="list-group-item">
                    Created At: {singleCuisine.createdAt}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center m-3 p-3">
          <div className="col d-flex justify-content-end">
            <Link to={`/edit/${singleCuisine.id}`} href="#">
              <button className="btn btn-primary" style={{ width: "10rem" }}>
                Edit
              </button>
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#uploadImageModal"
              style={{ width: "10rem" }}
            >
              Upload Image
            </button>
          </div>
          <div className="col d-flex justify-content-start">
            <button
              onClick={handleDelete}
              className="btn btn-primary"
              style={{ width: "10rem" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="uploadImageModal"
        tabIndex="-1"
        aria-labelledby="uploadImageLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Upload Image</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSumbitFile}>
                <div className="mb-3">
                  <label htmlFor="imgUrlid" className="form-label">
                    Image
                  </label>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                    name="imgUrl"
                    id="imgUrlid"
                  />
                  <div id="emailHelp" className="form-text">
                    Click on the "Choose File" button to upload a file:
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
