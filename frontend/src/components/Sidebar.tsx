import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  Settings,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {}

function Sidebar(props: Props) {
  const {} = props;

  const navigationItems = [
    { to: "/", label: "Trang chủ", icon: Home },
    { to: "/explore", label: "Khám phá", icon: Search },
    { to: "/trending", label: "Xu hướng", icon: TrendingUp },
    { to: "/notifications", label: "Thông báo", icon: Bell },
    { to: "/messages", label: "Tin nhắn", icon: Mail },
    { to: "/communities", label: "Cộng đồng", icon: Users },
    { to: "/bookmarks", label: "Đã lưu", icon: Bookmark },
    { to: "/profile", label: "Hồ sơ", icon: User },
    { to: "/settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <nav>
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <NavLink
                end
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-x-4 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-slate-50 shadow-md"
                      : " hover:bg-background-secondary "
                  }`
                }
              >
                <>
                  <Icon size={20} />
                  <span className="line-clamp-1">{item.label}</span>
                </>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
