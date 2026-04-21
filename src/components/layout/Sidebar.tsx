import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  Settings,
  Dumbbell,
  LifeBuoy,
  Activity,
} from "lucide-react";
import { cn } from "../../lib/utils"; // shadcn utility

import { useAuth } from "../../context/useAuth";

const gymNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["owner"],
  },
  {
    name: "Members",
    href: "/members",
    icon: Users,
    allowedRoles: ["owner", "admin"],
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCard,
    allowedRoles: ["owner"],
  },
  {
    name: "Audit Logs",
    href: "/logs",
    icon: Activity,
    allowedRoles: ["owner"],
  },
];
const appNavItems = [
  { name: "Billing", href: "/billing", icon: Receipt, allowedRoles: ["owner"] },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    allowedRoles: ["owner"],
  },
  {
    name: "Support",
    href: "/support",
    icon: LifeBuoy,
    allowedRoles: ["owner", "admin"],
  },
];

export const Sidebar = () => {
  const { user } = useAuth();

  // Filter the navigation items based on the user's role
  const filteredGymNavItems = gymNavItems.filter(
    (item) => user && item.allowedRoles.includes(user.role),
  );
  const filteredAppNavItems = appNavItems.filter(
    (item) => user && item.allowedRoles.includes(user.role),
  );
  return (
    <div className="bg-card text-card-foreground flex h-full w-64 flex-col border-r px-4 py-6">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <Dumbbell className="h-6 w-6 text-red-500" />
        <span className="text-2xl font-bold tracking-tight">
          Arv<span className="text-red-500">Fit</span>
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        {/*Gym Operations Navigation */}
        <nav className="space-y-1 border-b border-neutral-500 pb-2">
          {filteredGymNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary" // Active state
                    : "text-muted-foreground hover:bg-muted hover:text-foreground", // Inactive state
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        {/* App Navigations */}
        <nav className="space-y-1 pt-2">
          {filteredAppNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary" // Active state
                    : "text-muted-foreground hover:bg-muted hover:text-foreground", // Inactive state
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
