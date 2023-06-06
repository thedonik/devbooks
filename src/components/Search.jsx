const Search = () => {
  return (
    <div class="navbar navbar-dark bg-dark my-5 p-5 rounded-5 w-75 mx-auto">
      <form class="form  d-flex justify-content-between align-items-center w-75 mx-auto">
        <input
          class="form-control p-3 w-100"
          type="search"
          placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
          aria-label="Search"
        />
        <button
          class="btn btn-outline-success ml-5 p-3 my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
