import { CirclesToRhombusesSpinner } from "react-epic-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full mt-52">
      <CirclesToRhombusesSpinner color="gold" />
    </div>
  );
};

export default Loader;
