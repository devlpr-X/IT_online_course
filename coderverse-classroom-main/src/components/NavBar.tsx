import { useEffect, useState } from "react";
import { GraduationCap, Menu, BookOpen, LogIn, User, KeyRound, Book, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Хэрэглэгч нэвтэрсэн эсэхийг шалгах
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // Анхаар: Бодит апп-д энд хуудас руу чиглүүлэх код бичнэ
  };

  return (
    <nav className="fixed top-0 w-full bg-techhub-dark/90 backdrop-blur-sm z-50 border-b border-techhub-blue/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-techhub-blue" />
              <span className="text-2xl font-mono font-bold text-white">TechHub</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/courses">
                  <Button variant="ghost" className="text-white hover:text-techhub-blue flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Сургалтууд
                  </Button>
                </Link>
              </NavigationMenuItem>

              {!user && (
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white hover:text-techhub-blue flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Хэрэглэгчийн Цэс
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/login" className="flex items-center">
                          <LogIn className="mr-2 h-4 w-4" />
                          Нэвтрэх
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/signup" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Бүртгүүлэх
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/forgot-password" className="flex items-center">
                          <KeyRound className="mr-2 h-4 w-4" />
                          Нууц үг сэргээх
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/instructor/login" className="flex items-center">
                          <Book className="mr-2 h-4 w-4" />
                          Багшийн Нэвтрэх
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/login" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          Админ Нэвтрэх
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              )}

              {user && user.role === "instructor" && (
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white hover:text-techhub-blue flex items-center">
                        <Book className="mr-2 h-4 w-4" />
                        Багш
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/instructor/dashboard" className="flex items-center">
                          Хяналтын Самбар
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/instructor/create-course" className="flex items-center">
                          Сургалт Үүсгэх
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>Гарах</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              )}

              {user && user.role === "admin" && (
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white hover:text-techhub-blue flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Админ
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="flex items-center">
                          Хяналтын Самбар
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>Гарах</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {!user && (
            <Button className="bg-techhub-blue hover:bg-techhub-blue/80">
              <Link to="/signup" className="text-white">
                Эхлэх
              </Link>
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/courses">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Сургалтууд
                </Button>
              </Link>

              {!user && (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Нэвтрэх
                    </Button>
                  </Link>

                  <Link to="/signup">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Бүртгүүлэх
                    </Button>
                  </Link>

                  <Link to="/forgot-password">
                    <Button variant="ghost" className="w-full justify-start">
                      <KeyRound className="mr-2 h-4 w-4" />
                      Нууц үг сэргээх
                    </Button>
                  </Link>

                  <div className="pt-2 pb-2 border-t border-techhub-blue/20">
                    <h3 className="text-xs uppercase text-gray-400 ml-3 mb-2">Ажилтнууд</h3>
                  </div>

                  <Link to="/instructor/login">
                    <Button variant="ghost" className="w-full justify-start">
                      <Book className="mr-2 h-4 w-4" />
                      Багшийн Нэвтрэх
                    </Button>
                  </Link>

                  <Link to="/admin/login">
                    <Button variant="ghost" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Админ Нэвтрэх
                    </Button>
                  </Link>
                </>
              )}

              {user && user.role === "instructor" && (
                <>
                  <Link to="/instructor/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Book className="mr-2 h-4 w-4" />
                      Багшийн Хяналтын Самбар
                    </Button>
                  </Link>

                  <Link to="/instructor/create-course">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Сургалт Үүсгэх
                    </Button>
                  </Link>

                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    Гарах
                  </Button>
                </>
              )}

              {user && user.role === "admin" && (
                <>
                  <Link to="/admin/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Админ Хяналтын Самбар
                    </Button>
                  </Link>

                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    Гарах
                  </Button>
                </>
              )}

              {!user && (
                <Link to="/signup">
                  <Button className="bg-techhub-blue hover:bg-techhub-blue/80 w-full">Эхлэх</Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
