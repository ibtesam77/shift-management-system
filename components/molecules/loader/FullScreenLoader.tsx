import SimpleSpinner from "@/components/atoms/spinners/simple";

const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div role="status">
        <SimpleSpinner />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
