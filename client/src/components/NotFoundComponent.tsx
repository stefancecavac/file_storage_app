const NotFoundComponent = () => {
  return (
    <div className="flex flex-col items-center  justify-center m-5 mt-20  rounded-lg p-5">
      <img src="/undraw_no_data_re_kwbl.svg" height={200} width={200}></img>
      <p className="text-gray-500 font-semibold text-2xl mt-5">
        No Files or Folders found
      </p>
    </div>
  );
};

export default NotFoundComponent;
