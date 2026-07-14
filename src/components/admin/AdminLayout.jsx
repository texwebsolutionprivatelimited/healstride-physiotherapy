import { useState } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/admin",
    },
    {
      name: "Appointments",
      icon: <CalendarDays size={18} />,
      path: "/admin/appointments",
    },
    {
      name: "Patients",
      icon: <Users size={18} />,
      path: "/admin/patients",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/admin/settings",
    },
  ];

  const getButtonClass = (path) => {
    return `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
      location.pathname === path
        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
        : "bg-slate-800 text-slate-300 hover:bg-teal-600 hover:text-white"
    }`;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/adminlogin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[#0F172A] text-white p-6 flex-col">

        <h1 className="text-2xl font-bold mb-10">
          HealStride Admin
        </h1>

        <nav className="space-y-3 flex-1">

          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={getButtonClass(item.path)}
            >
              {item.icon}
              {item.name}
            </button>
          ))}

        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full mt-6 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">

          <aside className="w-72 bg-[#0F172A] text-white p-6 flex flex-col">

            <button
              onClick={() => setSidebarOpen(false)}
              className="mb-8"
            >
              <X size={26} />
            </button>

            <h1 className="text-2xl font-bold mb-10">
              HealStride Admin
            </h1>

            <nav className="space-y-3 flex-1">

              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={getButtonClass(item.path)}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}

            </nav>

            {/* Mobile Logout */}
            <button
              onClick={async () => {
                await handleLogout();
                setSidebarOpen(false);
              }}
              className="flex items-center justify-center gap-3 w-full mt-6 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white"
            >
              <LogOut size={18} />
              Logout
            </button>

          </aside>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-4 md:p-8">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-5 bg-white p-2 rounded-lg shadow hover:bg-gray-200 transition"
        >
          <Menu size={25} />
        </button>

        <Outlet />

      </main>

    </div>
  );
};

export default AdminLayout;