import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Загварын сургалтын мэдээлэл
  const courses = [
    { id: 1, title: "Ахисан түвшний React хөгжүүлэлт", instructor: "Бат", students: 134, status: "active", date: "2023-04-15" },
    { id: 2, title: "JavaScript-ийн үндэс", instructor: "Сараа Ууганбаяр", students: 312, status: "active", date: "2023-04-10" },
    { id: 3, title: "CSS мастер анги", instructor: "Мөнх-Эрдэнэ", students: 98, status: "pending", date: "2023-04-05" },
    { id: 4, title: "Node.js серверийн тал", instructor: "Лхагва Жаргал", students: 156, status: "active", date: "2023-04-02" },
    { id: 5, title: "Vue.js үндэс", instructor: "Дэлгэр Түмэн", students: 87, status: "pending", date: "2023-03-25" },
    { id: 6, title: "Мэдээллийн шинжлэх ухааны Python", instructor: "Энхтүвшин Дэлгэрмаа", students: 245, status: "active", date: "2023-03-20" },
    { id: 7, title: "Машин сургалтын үндэс", instructor: "Мөнхбат Болд", students: 178, status: "active", date: "2023-03-15" },
  ];
  
  useEffect(() => {
    // Хэрэглэгчийн нэвтрэлт болон эрх шалгах (админ эсэх)
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

  // Хайлтын үгээр сургалтуудыг шүүх
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null; // Нэвтрэлт шалгах хүртэл юу ч үзүүлэхгүй

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />

      <div className="container mx-auto pt-24 px-4 pb-12">
        <Button
          variant="ghost"
          className="text-techhub-blue mb-6"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Хяналтын самбар руу буцах
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">Сургалтын удирдлага</h1>
            <p className="text-gray-400 mt-1">Бүх сургалтыг харах, удирдах</p>
          </div>

          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Сургалтыг хайх..."
              className="pl-9 bg-black/20 border border-techhub-blue/20 text-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-black/20 border border-techhub-blue/20 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Сургалтын гарчиг</TableHead>
                <TableHead className="text-gray-300">Багш</TableHead>
                <TableHead className="text-gray-300">Оюутнууд</TableHead>
                <TableHead className="text-gray-300">Төлөв</TableHead>
                <TableHead className="text-gray-300">Үүсгэсэн огноо</TableHead>
                <TableHead className="text-gray-300">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map(course => (
                <TableRow key={course.id}>
                  <TableCell className="text-white font-medium">{course.title}</TableCell>
                  <TableCell className="text-gray-300">{course.instructor}</TableCell>
                  <TableCell className="text-gray-300">{course.students}</TableCell>
                  <TableCell>
                    <Badge
                      className={course.status === "active" ? "bg-green-500" : "bg-yellow-500"}
                    >
                      {course.status === "active" ? "Идэвхтэй" : "Хүлээгдэж байгаа"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(course.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                      onClick={() => navigate(`/admin/courses/${course.id}`)}
                    >
                      Дэлгэрэнгүй харах
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
