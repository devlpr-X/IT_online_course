import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminUserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Жишээ хэрэглэгчийн өгөгдөл
  const mockUserData = {
    id: 1,
    name: "Баатар",
    email: "baatar@gmail.com",
    role: "сурагч",
    joined: "2023-04-14",
    lastLogin: "2023-05-20",
    status: "идэвхтэй",
    coursesEnrolled: [
      { id: 1, title: "Орчин үеийн React хөгжүүлэлт", progress: 65, lastAccessed: "2023-05-18" },
      { id: 2, title: "JavaScript үндэс", progress: 42, lastAccessed: "2023-05-15" },
      { id: 4, title: "Node.js Backend", progress: 10, lastAccessed: "2023-05-10" }
    ],
    completedCourses: 2,
    totalQuizzesTaken: 8,
    averageQuizScore: 85
  };
  
  useEffect(() => {
    // Нэвтрэлт болон админ эрх шалгах
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
    
    // Жишээ өгөгдлийг дамжуулж байна, бодит апп-д userId-аар авах хэрэгтэй
    setUserData(mockUserData);
  }, [navigate, userId]);
  
  if (!user || !userData) return null; // Ачаалж дуусахаас өмнө юу ч харуулахгүй
  
  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />
      
      <div className="container mx-auto pt-24 px-4 pb-12">
        <Button 
          variant="ghost" 
          className="text-techhub-blue mb-6"
          onClick={() => navigate("/admin/users")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Хэрэглэгчдэд буцах
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">{userData.name}</h1>
            <p className="text-gray-400 mt-1">{userData.email}</p>
          </div>
          
          <Badge 
            className={userData.status === 'идэвхтэй' ? 'bg-green-500 mt-4 md:mt-0' : 'bg-yellow-500 mt-4 md:mt-0'}
          >
            {userData.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Хэрэглэгчийн үүрэг</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white capitalize">{userData.role}</div>
              <p className="text-gray-400 text-sm">Нэгдсэн огноо: {new Date(userData.joined).toLocaleDateString()}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Бүртгэлтэй курсууд</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center">
                <BookOpen className="h-5 w-5 text-techhub-blue mr-2" />
                {userData.coursesEnrolled.length}
              </div>
              <p className="text-gray-400 text-sm">{userData.completedCourses} курс амжилттай төгссөн</p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Дундаж сорилтын оноо</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center">
                <CheckCircle className="h-5 w-5 text-techhub-blue mr-2" />
                {userData.averageQuizScore}%
              </div>
              <p className="text-gray-400 text-sm">{userData.totalQuizzesTaken} сорил өгсөн</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-black/20 border border-techhub-blue/20 rounded-lg overflow-hidden mb-8">
          <div className="p-4 border-b border-techhub-blue/20">
            <h2 className="text-xl font-mono font-bold text-white">Бүртгэлтэй курсууд</h2>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Курс</TableHead>
                <TableHead className="text-gray-300">Явц</TableHead>
                <TableHead className="text-gray-300">Сүүлд нэвтэрсэн</TableHead>
                <TableHead className="text-gray-300">Үйлдлүүд</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.coursesEnrolled.map(course => (
                <TableRow key={course.id}>
                  <TableCell className="text-white font-medium">{course.title}</TableCell>
                  <TableCell>
                    <div className="w-full bg-techhub-blue/20 rounded-full h-2.5">
                      <div 
                        className="bg-techhub-blue h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{course.progress}% дууссан</p>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(course.lastAccessed).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                      onClick={() => navigate(`/admin/courses/${course.id}`)}
                    >
                      Курсыг харах
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

export default AdminUserDetails;
