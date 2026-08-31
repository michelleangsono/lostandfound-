export const Header = () => {
  return (
    <div className="bg-[#114b7d] w-full flex flex-col items-center justify-center py-12 px-4 rounded-t-xl">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
        <span className="text-[#114b7d] font-bold text-xl">BSJ</span>
      </div>
      <h1 className="text-white text-2xl font-bold tracking-tight">
        Lost and found
      </h1>
      <p className="text-blue-200 mt-1 text-sm">British School Jakarta</p>
    </div>
  );
};
