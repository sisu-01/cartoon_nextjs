import Cut from "../cut/cut";
import Sort from "../sort/sort";

const Filter = ({ currentSort, currentCut }) => {
  return (
    <div className="d-flex align-items-center justify-content-end gap-3 px-2">
      <Sort checked={currentSort} />
      <Cut checked={currentCut} />
    </div>
  );
}

export default Filter;