import { useNavigate } from "react-router-dom";

export default function CardHome({ cuisine }) {
  const navigate = useNavigate();

  function changePage(id) {
    navigate(`/detail/${id}`);
  }
  return (
    <>
      <div className="card" style={{ width: "11.3rem" }}>
        <img src={cuisine.imgUrl} alt="Food Image" className="card-img top" />
        <div className="card-body text-start">
          <p className="card-title">{cuisine.name}</p>
          <p className="card-price">Rp {cuisine.price}</p>
          <button
            onClick={() => {
              changePage(cuisine.id);
            }}
            className="btn btn-info btn-sm"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}
