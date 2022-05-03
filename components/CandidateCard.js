const CandidateCard = ({ visible, title, id, description, location, onApply, loading }) => {
  return (
    <div className="flex  w-full flex-col justify-between rounded-md bg-white p-4 shadow-md">
      <div>
        <h2 title={title} className="mb-2 cursor-default truncate text-base">
          {title}
        </h2>
        <p
          title={description}
          className="customLineClamp customTextRows3 mb-4 max-h-16 cursor-default text-sm"
        >
          {description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img className="mr-1 h-4 w-4" src="/assets/icons/location.svg" alt="location icon" />
          <p title={location} className="w-24 cursor-default truncate md:w-[12rem] lg:w-32">
            {location}
          </p>
        </div>

        {visible && (
          <button
            disabled={loading}
            className="customLineClamp customTextRows1 h-8 w-[4rem] whitespace-nowrap rounded-md bg-secondary-medium px-[0.2rem] hover:bg-[#6FB2D2] disabled:cursor-not-allowed "
            onClick={() => onApply(id)}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

CandidateCard.defaultProps = {
  loading: false,
  title: "",
  id: "",
  description: "",
  location: "",
  onApply: () => {},
  visible: false
};

export default CandidateCard;
