import GridToggleButton from "./GridToggleButton";
import ShowTypeComponent from "./ShowTypeComponent";

const FilterComponent = () => {
  return (
    <div className="flex gap-5 justify-between">
      <ShowTypeComponent></ShowTypeComponent>
      <GridToggleButton></GridToggleButton>
    </div>
  );
};

export default FilterComponent;
