import { useEffect, useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormCuisine({ message, singleCuisine }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
    categoryId: 0,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "https://p2-gc1-restaurant.avprojects.online/cuisines",
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
        data: input,
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

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "put",
        url: `https://p2-gc1-restaurant.avprojects.online/cuisines/${singleCuisine.id}`,
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
        data: input,
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
    if (singleCuisine) {
      setInput({
        name: singleCuisine.name,
        description: singleCuisine.description,
        price: singleCuisine.price,
        imgUrl: singleCuisine.imgUrl,
        categoryId: singleCuisine.categoryId,
      });
    }
  }, [singleCuisine]);

  return (
    <>
      <form onSubmit={singleCuisine ? handleEditSubmit : handleAddSubmit}>
        <div className="mb-3">
          <label htmlFor="nameid" className="form-label">
            Name
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control"
            name="name"
            id="nameid"
            defaultValue={singleCuisine ? singleCuisine.name : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionid" className="form-label">
            Description
          </label>
          <textarea
            onChange={handleInputChange}
            name="description"
            id="descriptionid"
            className="form-control"
            rows="5"
            defaultValue={singleCuisine ? singleCuisine.description : ""}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="priceid" className="form-label">
            Price
          </label>
          <input
            onChange={handleInputChange}
            type="number"
            className="form-control"
            name="price"
            id="priceid"
            defaultValue={singleCuisine ? singleCuisine.price : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgUrlid" className="form-label">
            Image URL
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control"
            name="imgUrl"
            id="imgUrlid"
            defaultValue={singleCuisine ? singleCuisine.imgUrl : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryIdid" className="form-label">
            Category Id
          </label>
          <select
            onChange={handleInputChange}
            name="categoryId"
            id="categoryIdid"
            className="form-select"
            value={singleCuisine ? input.categoryId : ""}
          >
            <option value="">--Select Categories--</option>
            <option value={1}>Set Menu</option>
            <option value={2}>Desserts & Beverages</option>
            <option value={3}>Snacks</option>
          </select>
        </div>
        <div className="d-flex justify-content-center mt-5 mb-5">
          <ButtonSubmit message={message} />
        </div>
      </form>
    </>
  );
}
