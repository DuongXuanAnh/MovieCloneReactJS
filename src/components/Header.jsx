const Header = () => {  
    return (
        <div className="p-4 flex justify-between fixed top-0 left-0 w-full z-[9999]  bg-black">
        <div className="flex items-center gap-8">
          <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie</h1>
          <nav className="hidden md:flex items-center space-x-5">
            <a href="#" className="text-white hover:text-red-700">
              Home
            </a>
            <a href="#" className="text-white hover:text-red-700">
              About
            </a>
            <a href="#" className="text-white hover:text-red-700">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-5">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 p-2 text-black"
          />
          <button
            className="bg-red-700 text-white px-3 py-1 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
    )
}

export default Header