import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailedPage() {
  const { id } = useParams();

  const [cuisine, setCuisine] = useState([]);

  async function fetchData() {
    const { data } = await axios({
      url: `https://p2-gc1-restaurant.avprojects.online/pub/cuisines/${id}`,
      method: "get",
    });

    setCuisine(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="row mt-2 text-center">
        <h1>{cuisine.name}</h1>
      </div>
      <div className="container-fluid">
        <div className="row m-5 p-5 d-flex justify-content-center">
          <div className="card col-8" style={{ height: "25.rem" }}>
            <div
              className="row d-flex justify-content-center"
              style={{ width: "auto", height: "25rem" }}
            >
              <div className="col-5 d-flex justify-content-end">
                <img
                  src={cuisine.imgUrl}
                  alt="Food Image"
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-5">
                <div className="card-body text-start">
                  <p className="card-text">Complete with:</p>
                  <p className="card-text">{cuisine.description}</p>
                  <p className="card-text">Only Rp {cuisine.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
