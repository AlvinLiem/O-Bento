import { useState } from "react";
import FormCuisine from "../components/FormCuisine";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function CuisineEditPage() {
  const { id } = useParams();
  const [singleCuisine, setSingleCuisine] = useState({});

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="col-10 bg-light rounded-end-4">
        <div className="row">
          <h2 className="text-center border-bottom">Edit Cuisines</h2>
        </div>
        <div className="row">
          <FormCuisine
            message={"Update Cuisine"}
            singleCuisine={singleCuisine}
          />
        </div>
      </div>
    </>
  );
}
