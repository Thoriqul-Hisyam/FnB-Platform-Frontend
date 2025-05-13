"use client";
import axios from "axios";
import {
  Home,
  Utensils,
  Users,
  LogOut,
  AlignLeft,
  AlignJustify,
  ChevronDown,
  ChevronRight,
  Store,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:3001/restaurants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurants(res.data);
        console.log("Restaurants:", res.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/login");
  };

  return (
    <aside
      className={`h-screen bg-violet-800 text-white p-4 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className=" mb-6 text-white hover:text-violet-300 transition"
      >
        {collapsed ? <AlignLeft size={20} /> : <AlignJustify size={20} />}
      </button>

      {!collapsed && <h1 className="text-xl font-semibold mb-8">U-Food</h1>}
      {collapsed && <h1 className="text-xl font-semibold mb-8">U</h1>}

      {/* Navigation */}
      <nav className="flex flex-col gap-4 flex-grow">
        <SidebarLink
          href="/dashboard"
          icon={<Home size={20} />}
          label="Dashboard"
          collapsed={collapsed}
        />
        {/* <SidebarLink href="/dashboard/restaurants" icon={<Utensils size={20} />} label="Restaurants" collapsed={collapsed} /> */}
        <button
          onClick={() => setShowRestaurants(!showRestaurants)}
          className="flex items-center gap-3 text-sm hover:text-violet-300 transition-colors"
        >
          <Store size={20} />
          {!collapsed && (
            <span className="flex items-center justify-between w-full">
              Restaurants{" "}
              {showRestaurants ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
        </button>
        {!collapsed && showRestaurants && (
          <div className="ml-6 flex flex-col gap-2">
            {restaurants.map((restaurant: any) => (
              <div key={restaurant.id} className="flex items-center gap-2">
                <Store size={16} />
                <SidebarLink
                  href={`/dashboard/restaurants/${restaurant.id}`}
                  label={restaurant.name}
                  collapsed={collapsed}
                  icon={null}
                />
              </div>
            ))}
          </div>
        )}
        <SidebarLink
          href="/dashboard/users"
          icon={<Users size={20} />}
          label="Users"
          collapsed={collapsed}
        />
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-sm hover:text-violet-300 transition-colors mt-8"
      >
        <LogOut size={20} />
        {!collapsed && "Logout"}
      </button>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-sm hover:text-violet-300 transition-colors"
    >
      {icon}
      {!collapsed && label}
    </Link>
  );
}
