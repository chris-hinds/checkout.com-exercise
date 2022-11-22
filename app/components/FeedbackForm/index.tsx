const FeedbackForm = () => {
  return (
    <div className="container">
      <div className="w-full mx-auto p-4 rounded-2xl shadow-2xl">
        <div className="flex">
          <h1 className="font-bold uppercase text-3xl">
            How was your <br />
            Experience?
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-y-0 lg:gap-5 mt-5">
          <div className="grid gap-5 col-span-1">
            <input
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Rating (1 - 5 stars)*"
            />
          </div>
          <div className="col-span-2">
            <textarea
              placeholder="Comment*"
              className="w-full h-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>
        <div className="my-2 w-1/2 lg:w-1/4">
          <button
            className="uppercase text-sm font-bold tracking-wide bg-brand text-gray-100 p-3 rounded-lg w-full 
                  focus:outline-none focus:shadow-outline"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
