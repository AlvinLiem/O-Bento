import { useState } from "react";
import TableRowCategories from "../components/TableRowCategories";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function CategoryListPage() {
  const [categoryData, setCategoryData] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://p2-gc1-restaurant.avprojects.online/categories",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      data.sort((a, b) => a.id - b.id);
      setCategoryData(data);
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
        <div className="row ">
          <h2 className="text-center border-bottom">All Categories</h2>
          <div>
            <table className="table table-hover text-center text wrap">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                {categoryData &&
                  categoryData.map((category) => {
                    return (
                      <TableRowCategories
                        category={category}
                        key={category.id}
                      />
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
