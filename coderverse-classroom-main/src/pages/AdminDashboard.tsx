import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  User, 
  DollarSign,
  CheckCircle,
  Clock
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Түр мэдээлэл (mock)
  const stats = {
    totalCourses: 45,
    totalStudents: 1250,
    totalInstructors: 12,
    totalRevenue: 24680,
    activeUsers: 358,
    completionRate: 68,
  };
  const recentCourses = [
    { id: 1, title: "Ахисан түвшний React хөгжүүлэлт", instructor: "Жанцан Бат", students: 134, status: "active", date: "2023-04-15" },
    { id: 2, title: "JavaScript суурь ойлголтууд", instructor: "Номин Уянга", students: 312, status: "active", date: "2023-04-10" },
    { id: 3, title: "CSS-ийн мастер анги", instructor: "Бат-Эрдэнэ Мөнх", students: 98, status: "pending", date: "2023-04-05" },
    { id: 4, title: "Node.js серверийн тал", instructor: "Саран Лхагва", students: 156, status: "active", date: "2023-04-02" },
    { id: 5, title: "Vue.js үндэс", instructor: "Төгсбилэг Хишиг", students: 87, status: "pending", date: "2023-03-25" },
  ];
  
  const recentUsers = [
    { id: 1, name: "Баатар Очир", email: "baatar@example.com", role: "student", joined: "2023-04-14" },
    { id: 2, name: "Сараа Энхжаргал", email: "saraa@example.com", role: "student", joined: "2023-04-12" },
    { id: 3, name: "Дөлгөөн Ганбат", email: "dolgoon@example.com", role: "instructor", joined: "2023-04-10" },
    { id: 4, name: "Мөнхтуяа Амарсанаа", email: "monkhtuyaa@example.com", role: "student", joined: "2023-04-08" },
    { id: 5, name: "Хасбаатар Сүхбат", email: "khasbaatar@example.com", role: "instructor", joined: "2023-04-05" },
  ];
  

  useEffect(() => {
    // Админ эсэх болон нэвтэрсэн эсэхийг шалгах
    const userFromStorage = localStorage.getItem("user");
    if (!userFromStorage) {
      navigate("/admin/login");
      return;
    }

    const parsedUser = JSON.parse(userFromStorage);
    if (parsedUser.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />

      <div className="container mx-auto pt-24 px-4 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">Админ Самбар</h1>
            <p className="text-gray-400 mt-1">Платформын хяналт ба удирдлага</p>
          </div>

          <Button 
            variant="outline"
            className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10 mt-4 md:mt-0"
            onClick={handleLogout}
          >
            Гарах
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт сургалтууд</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <BookOpen className="h-8 w-8 text-techhub-blue mr-4" />
              <div className="text-2xl font-bold text-white">{stats.totalCourses}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт оюутнууд</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Users className="h-8 w-8 text-techhub-blue mr-4" />
              <div className="text-2xl font-bold text-white">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт багш нар</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <User className="h-8 w-8 text-techhub-blue mr-4" />
              <div className="text-2xl font-bold text-white">{stats.totalInstructors}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Орлого</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <DollarSign className="h-8 w-8 text-techhub-blue mr-4" />
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Идэвхтэй хэрэглэгчид</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Clock className="h-8 w-8 text-techhub-blue mr-4" />
              <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Дуусгах хувь</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <CheckCircle className="h-8 w-8 text-techhub-blue mr-4" />
              <div className="text-2xl font-bold text-white">{stats.completionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Сүүлийн нэмэгдсэн сургалтууд</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-300">Нэр</TableHead>
                    <TableHead className="text-gray-300">Багш</TableHead>
                    <TableHead className="text-gray-300">Оюутнууд</TableHead>
                    <TableHead className="text-gray-300">Төлөв</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCourses.map(course => (
                    <TableRow key={course.id}>
                      <TableCell className="text-white">{course.title}</TableCell>
                      <TableCell className="text-gray-300">{course.instructor}</TableCell>
                      <TableCell className="text-gray-300">{course.students}</TableCell>
                      <TableCell>
                        <Badge 
                          className={course.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}
                        >
                          {course.status === 'active' ? 'Идэвхтэй' : 'Хүлээгдэж буй'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Button 
                  variant="ghost" 
                  className="text-techhub-blue"
                  onClick={() => navigate("/admin/courses")}
                >
                  Бүх сургалтыг харах
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Сүүлийн хэрэглэгчид</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-300">Нэр</TableHead>
                    <TableHead className="text-gray-300">И-мэйл</TableHead>
                    <TableHead className="text-gray-300">Үүрэг</TableHead>
                    <TableHead className="text-gray-300">Нэгдсэн</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="text-white">{user.name}</TableCell>
                      <TableCell className="text-gray-300">{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          className={user.role === 'instructor' ? 'bg-techhub-blue' : 'bg-gray-500'}
                        >
                          {user.role === 'instructor' ? 'Багш' : 'Оюутан'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(user.joined).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Button 
                  variant="ghost" 
                  className="text-techhub-blue"
                  onClick={() => navigate("/admin/users")}
                >
                  Бүх хэрэглэгчийг харах
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
