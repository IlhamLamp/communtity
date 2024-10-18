const LoadingPage: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center h-[20rem] text-center">
      <span className="sr-only">Loading...</span>
      <div className="flex gap-2">
        <div className="h-4 w-4 bg-Navy rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-4 w-4 bg-Navy rounded-full animate-bounce [animation-delay:-0.8s]" />
        <div className="h-4 w-4 bg-Navy rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default LoadingPage;
