import { debounce } from "lodash";
import {
  Bell,
  Loader2,
  LogIn,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  UserPlus,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/settingSlice";
import type { RootState } from "../redux/store";
import { routes } from "../routes";
import ImageWrapper from "./ImageWrapper";

// Fake search data
const mockSearchData = [
  {
    id: 1,
    title: "Getting Started Guide",
    category: "Documentation",
    url: "/docs/getting-started",
  },
  {
    id: 2,
    title: "API Reference",
    category: "Documentation",
    url: "/docs/api",
  },
  {
    id: 3,
    title: "User Profile Settings",
    category: "Settings",
    url: "/settings/profile",
  },
  {
    id: 4,
    title: "Theme Configuration",
    category: "Settings",
    url: "/settings/theme",
  },
  {
    id: 5,
    title: "Dashboard Analytics",
    category: "Analytics",
    url: "/dashboard/analytics",
  },
  {
    id: 6,
    title: "Project Management",
    category: "Projects",
    url: "/projects",
  },
  { id: 7, title: "Team Collaboration", category: "Teams", url: "/teams" },
  { id: 8, title: "File Upload", category: "Files", url: "/files/upload" },
  {
    id: 9,
    title: "Notification Settings",
    category: "Settings",
    url: "/settings/notifications",
  },
  { id: 10, title: "Account Security", category: "Security", url: "/security" },
  {
    id: 11,
    title: "Payment History",
    category: "Billing",
    url: "/billing/history",
  },
  { id: 12, title: "System Status", category: "System", url: "/status" },
  { id: 13, title: "Help Center", category: "Support", url: "/help" },
  { id: 14, title: "Contact Support", category: "Support", url: "/contact" },
  { id: 15, title: "Privacy Policy", category: "Legal", url: "/privacy" },
];

interface SearchResult {
  id: number;
  title: string;
  category: string;
  url: string;
}

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const theme = useSelector((state: RootState) => state.setting.theme);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;

  // Fake search function
  const performSearch = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return mockSearchData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8); // Limit to 8 results
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setIsSearching(true);

      // Simulate API delay
      setTimeout(() => {
        const results = performSearch(query);
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Handle search result click
  const handleSearchResultClick = (result: SearchResult) => {
    console.log("Navigate to:", result.url);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search submitted:", searchQuery);
      // Handle search submission logic here
    }
  };

  const handleDarkModeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    } else {
      console.log("Profile clicked - not authenticated");
    }
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    // Handle logout logic
    setIsProfileMenuOpen(false);
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Navigate to settings page
    setIsProfileMenuOpen(false);
  };

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileMenuOpen &&
        !(event.target as Element).closest(".profile-menu-container")
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  return (
    <div className="relative">
      {/* Desktop Header */}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left section - Logo and Title */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <h1 className="text-lg font-semibold truncate">Social</h1>
        </div>

        {/* Center section - Search (only show if authenticated) */}
        {isAuthenticated && (
          <div className="flex-1 max-w-md mx-4 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                {isSearching ? (
                  <Loader2
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary animate-spin"
                  />
                ) : (
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  />
                )}
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-background-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
            </form>

            {/* Desktop Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-background-secondary border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full px-4 py-3 text-left cursor-pointer hover:bg-background-elevated border-b border-border last:border-b-0 transition-colors"
                  >
                    <div className="font-medium  text-sm">{result.title}</div>
                    <div className="text-xs text-text-secondary mt-1">
                      {result.category}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right section - User controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="p-2 cursor-pointer rounded-lg hover:bg-background-secondary transition-colors"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Authenticated User Controls */}
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-lg cursor-pointer hover:bg-background-secondary transition-colors relative"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </button>

              {/* Profile with dropdown */}
              <div className="relative profile-menu-container">
                <button
                  onClick={handleProfileClick}
                  className="flex cursor-pointer items-center space-x-2 p-2 rounded-lg hover:bg-background-secondary transition-colors"
                  title="Profile"
                >
                  {user?.avatar ? (
                    <ImageWrapper
                      src={user?.avatar.url}
                      alt={`${user?.firstName} ${user?.lastName}` || "User"}
                      width={24}
                      height={24}
                      containerClassName="rounded-full"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary text-slate-50 flex items-center justify-center text-xs font-medium">
                      {`${user?.firstName} ${user?.lastName}`.charAt(0) ||
                        user?.email?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium hidden lg:block">
                    {`${user?.firstName} ${user?.lastName}` ||
                      user?.email?.split("@")[0] ||
                      "User"}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-background-secondary border border-border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium ">
                        {`${user?.firstName} ${user?.lastName}` || "User"}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleSettingsClick}
                        className="w-full px-4 py-2 text-left text-sm  hover:bg-background-elevated transition-colors flex items-center space-x-2"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogoutClick}
                        className="w-full px-4 py-2 text-left text-sm  hover:bg-background-elevated transition-colors flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Guest User Controls */
            <>
              <Link
                to={routes.login}
                className="flex cursor-pointer items-center space-x-2 px-4 py-2 hover:bg-background-secondary rounded-lg transition-all"
              >
                <LogIn size={16} />
                <span>Đăng nhập</span>
              </Link>
              <Link
                to={routes.register}
                className="flex items-center cursor-pointer space-x-2 px-4 py-2 text-slate-50 bg-primary hover:bg-primary-hover rounded-lg transition-all"
              >
                <UserPlus size={16} />
                <span>Đăng ký</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden w-full items-center justify-between">
        {/* Left section - Title */}
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <h1 className="text-base font-semibold  truncate">Social</h1>
        </div>

        {/* Right section - Mobile controls */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Search toggle for mobile (only if authenticated) */}
          {isAuthenticated && (
            <button
              onClick={toggleSearch}
              className="p-2 cursor-pointer rounded-lg  hover:bg-background-secondary transition-colors"
              title="Search"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="p-2 rounded-lg cursor-pointer  hover:bg-background-secondary transition-colors"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile User Controls */}
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <button
                onClick={handleNotificationClick}
                className="p-2 rounded-lg cursor-pointer  hover:bg-background-secondary transition-colors relative"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </button>

              {/* Profile */}
              <div className="relative profile-menu-container">
                <button
                  onClick={handleProfileClick}
                  className="p-2 rounded-lg cursor-pointer  hover:bg-background-secondary transition-colors"
                  title="Profile"
                >
                  {user?.avatar ? (
                    <ImageWrapper
                      src={user?.avatar.url}
                      alt={`${user?.firstName} ${user?.lastName}` || "User"}
                      width={20}
                      height={20}
                      containerClassName="rounded-full"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary text-slate-50 flex items-center justify-center text-xs font-medium">
                      {`${user?.firstName} ${user?.lastName}`.charAt(0) ||
                        user?.email?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                </button>

                {/* Mobile Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-background-secondary border border-border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium ">
                        {`${user?.firstName} ${user?.lastName}` || "User"}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleSettingsClick}
                        className="w-full px-4 py-2 text-left text-sm  hover:bg-background-elevated transition-colors flex items-center space-x-2"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogoutClick}
                        className="w-full px-4 py-2 text-left text-sm  hover:bg-background-elevated transition-colors flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Mobile Guest Controls */
            <>
              <Link
                to={routes.login}
                className="p-2 cursor-pointer rounded-lg hover:bg-background-secondary transition-colors"
                title="Đăng nhập"
              >
                <LogIn size={18} />
              </Link>
              <Link
                to={routes.register}
                className="p-2 cursor-pointer rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
                title="Đăng ký"
              >
                <UserPlus size={18} />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar (only if authenticated) */}
      {isAuthenticated && isSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              {isSearching ? (
                <Loader2
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary animate-spin"
                />
              ) : (
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
              )}
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-4 text-sm bg-background-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                autoFocus
              />
            </div>
          </form>

          {/* Mobile Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-background-secondary border border-border rounded-lg mt-1.5 shadow-lg max-h-96 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSearchResultClick(result)}
                  className="w-full px-4 py-3 text-left cursor-pointer hover:bg-background-elevated border-b border-border last:border-b-0 transition-colors"
                >
                  <div className="font-medium  text-sm">{result.title}</div>
                  <div className="text-xs text-text-secondary mt-1">
                    {result.category}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isAuthenticated && isSearchOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </div>
  );
}

export default Header;
