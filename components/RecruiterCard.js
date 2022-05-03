const RecruiterCard = ({ title, id, description, location, onViewApplicant }) => {
  return (
    <div className="flex w-full flex-col justify-between rounded-md bg-white p-4 shadow-md">
      <div>
        <h2 title={title} className="mb-2 cursor-default truncate text-base ">
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
          <p title={location} className="w-24 cursor-default truncate">
            {location}
          </p>
        </div>

        <button
          onClick={() => onViewApplicant(id)}
          className="customLineClamp customTextRows1 h-8 w-32 whitespace-nowrap rounded-md bg-secondary-medium px-2 text-xs hover:bg-[#6FB2D2] disabled:cursor-not-allowed "
        >
          View Application
        </button>
      </div>
    </div>
  );
};

RecruiterCard.defaultProps = {
  title: "",
  id: "",
  description: "",
  location: "",
  onViewApplicant: () => {}
};

export default RecruiterCard;
