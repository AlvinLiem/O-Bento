export default function TableRowCategories({ category }) {
  return (
    <>
      <tr>
        <th scope="row">{category.id}</th>
        <td>{category.name}</td>
        <td>{category.createdAt}</td>
      </tr>
    </>
  );
}
