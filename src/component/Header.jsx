import { useState, useRef, useEffect } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContextObject";
import { products } from "../data/products";

const Header = () => {
  const { getTotalItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim()) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  // Handle clicking a search result
  const handleResultClick = (productId) => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full px-3 md:px-8 lg:px-12 xl:px-14 py-3 border-b-1 border-b-[#F0F2F5] bg-transparent">
      <div className="w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <NavLink
            to="/"
            className="sm:text-xl text-base font-bold text-[#3D99F5]"
          >
            Ade Store
          </NavLink>
        </div>
        <div
          className="relative bg-[#F0F2F5] md:w-[70%] mx-auto flex items-center rounded-md px-2 py-2"
          ref={searchRef}
        >
          <Search className="h-4 w-4 sm:w-6 sm:h-6 text-[#121417]" />
          <input
            type="text"
            placeholder="Search by product name..."
            className="outline-none text-[#121417] text-sm md:text-base ml-2 w-32 sm:w-auto flex-grow"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => searchResults.length > 0 && setIsSearchOpen(true)}
          />
          {isSearchOpen && searchResults.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-50 max-h-64 overflow-y-auto border border-[#F0F2F5]">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-[#F0F2F5] cursor-pointer flex items-center gap-2"
                  onClick={() => handleResultClick(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-4">
          <NavLink to="/login">
            <button className="relative bg-[#F0F2F5] rounded-full p-2 cursor-pointer">
              <User className="text-[#121417] h-4 w-4 sm:w-6 sm:h-6 hover:text-[#3D99F5]" />
            </button>
          </NavLink>
          <NavLink to="/cart">
            <button className="relative bg-[#F0F2F5] rounded-md p-2 cursor-pointer">
              <ShoppingCart className="text-[#121417] h-4 w-4 sm:w-6 sm:h-6 hover:text-[#3D99F5]" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {getTotalItems()}
              </span>
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
