const Loader = () => {
  console.log("loader loading....................");
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-t-blue-500 border-r-4 border-r-blue-500 border-b-4 border-b-blue-500 w-12 h-12"></div>
    </div>
  );
};

export default Loader;