import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, BookOpen, Video, Users } from "lucide-react";

interface User {
  id: number;
  name: string;
  role: string;
  [key: string]: any;
}

interface Course {
  id: number;
  title: string;
  students: number;
  lessons: number;
}

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Жишээ курсын өгөгдөл
  const courses: Course[] = [
    { id: 1, title: "Advanced React Development", students: 1234, lessons: 18 },
    { id: 2, title: "JavaScript Fundamentals", students: 2156, lessons: 24 },
    { id: 3, title: "CSS Masterclass", students: 867, lessons: 15 }
  ];

  useEffect(() => {
    try {
      const userFromStorage = localStorage.getItem("user");
      if (!userFromStorage) {
        navigate("/instructor/login");
        return;
      }
      const parsedUser = JSON.parse(userFromStorage);
      if (parsedUser.role !== "instructor") {
        navigate("/instructor/login");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error("Хэрэглэгчийн мэдээллийг хадгалаас уншихад алдаа гарлаа", error);
      navigate("/instructor/login");
      return;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/instructor/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-techhub-dark text-white">
        Ачааллаж байна...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />

      <div className="container mx-auto pt-24 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">Багшийн хяналтын самбар</h1>
            <p className="text-gray-400 mt-1">Курсууд болон хичээлүүдээ удирдаарай</p>
          </div>

          <div className="mt-4 md:mt-0 space-x-3">
            <Button
              className="bg-techhub-blue hover:bg-techhub-blue/80"
              onClick={() => navigate("/instructor/create-course")}
            >
              <Plus className="mr-1 h-4 w-4" />
              Курс үүсгэх
            </Button>

            <Button
              variant="outline"
              className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
              onClick={handleLogout}
            >
              Гарах
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт курс</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{courses.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт суралцагч</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {courses.reduce((total, course) => total + course.students, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт хичээл</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {courses.reduce((total, course) => total + course.lessons, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-black/20 border border-techhub-blue/20 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-techhub-blue/20">
            <h2 className="text-xl font-mono font-bold text-white">Таны курсууд</h2>
          </div>

          <div className="divide-y divide-techhub-blue/20">
            {courses.map(course => (
              <div key={course.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{course.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {course.students} суралцагч
                      </div>
                      <div className="flex items-center">
                        <Video className="mr-1 h-4 w-4" />
                        {course.lessons} хичээл
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-4 md:mt-0 space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                      onClick={() => navigate(`/instructor/manage-lessons/${course.id}`)}
                    >
                      <Video className="mr-1 h-4 w-4" />
                      Хичээл удирдах
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                      onClick={() => navigate(`/instructor/edit-course/${course.id}`)}
                    >
                      Курс засах
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
