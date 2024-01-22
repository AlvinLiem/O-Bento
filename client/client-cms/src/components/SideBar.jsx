import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="col-2 bg-dark text-light rounded-start-4">
        <div className="row  d-flex justify-content-center">
          <h2 className="text-center">Navigations</h2>
          <div>
            <ul className="list-group list-group-flush">
              <Link to={`/`} role="button" className="nav-link">
                <li className="list-group-item border-0 bg-dark text-light">
                  All Cuisines
                </li>
              </Link>
              <Link to={`/add`} role="button" className="nav-link">
                <li className="list-group-item border-0 bg-dark text-light">
                  Add Cuisines
                </li>
              </Link>
              <Link to={`/categories`} role="button" className="nav-link">
                <li className="list-group-item border-0 bg-dark text-light">
                  All Categories
                </li>
              </Link>
              <Link to={`/register`} role="button" className="nav-link">
                <li className="list-group-item border-0 bg-dark text-light">
                  Register
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
