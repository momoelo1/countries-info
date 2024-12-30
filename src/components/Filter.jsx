const Filter = ({ handleFilter, value }) => {

  return (
    <div>
      Enter a Country:{" "}
      <input value={value} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
