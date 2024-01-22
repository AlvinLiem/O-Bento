import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.clear();
    navigate(`/login`);
  }

  return (
    <>
      <div className="nav navbar bg-warning">
        <div className="div container-fluid justify-content-between">
          <div>
            <Link to={`/`} className="btn">
              <img
                src="/logo.png"
                style={{ width: "8rem", height: "auto" }}
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <span onClick={logoutHandler} className="btn">
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
