import { Link } from "react-router-dom";
import { Menu, User, LogOut, Sun, Moon, MonitorPlay } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { PageLoader } from "../ui/loader";

import { Sidebar } from "./Sidebar";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";

export const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  // Helper to get initials for the avatar
  const getInitials = (name: string) => name.substring(0, 2).toUpperCase();

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <header className="bg-background sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-4 md:px-6">
          {/* Mobile Menu Trigger (Hidden on Desktop) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
          <div>
            <Button
              className="hidden bg-red-600 text-white shadow-md transition-transform hover:scale-105 hover:bg-red-700 sm:flex"
              asChild
            >
              <Link to="/operation">
                <MonitorPlay className="mr-2 h-4 w-4" />
                Operate
              </Link>
            </Button>
          </div>
          {/* Right Side Actions */}

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name ? (
                        getInitials(user.name)
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {user?.name}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      )}
    </>
  );
};
