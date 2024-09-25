type BlogHeaderProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function BlogHeader({ search, handleSearch }: BlogHeaderProps) {
  return (
    <div className="p-4 text-center text-[#3b3030] bg-[#FFF0D1] flex items-center justify-between ">
      <div className="text-2xl font-bold logo">E-Vas Tel Blog</div>
      <div className="search-input">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for post"
          className="p-2 border-2 border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
}
export default BlogHeader;
