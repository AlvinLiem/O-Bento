import FormCuisine from "../components/FormCuisine";

export default function CuisineAddPage() {
  return (
    <>
      <div className="col-10 bg-light rounded-end-4">
        <div className="row">
          <h2 className="text-center border-bottom">Add Cuisines</h2>
        </div>
        <div className="row">
          <FormCuisine message={"Add Cuisine"} />
        </div>
      </div>
    </>
  );
}
