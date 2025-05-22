import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Users, Video } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  
  // Жишээ курсийн мэдээлэл
  const mockCourse = {
    id: 1,
    title: "Advanced React Development",
    instructor: "Бат",
    description: "Хүргэлтийн React-ын орчин үеийн хуудсуудыг суралцах, хуудсанд hooks, context болон advanced загваруудыг эзэмших.",
    created: "2023-04-15",
    status: "active",
    price: 49.99,
    students: 134,
    sections: [
      {
        id: 1,
        title: "Advanced React-ийн Танилцуулга",
        lessons: [
          { id: 1, title: "Курсын тойм", duration: "5:20", likes: 128 },
          { id: 2, title: "Хөгжүүлэлтийн орчныг бэлтгэх", duration: "10:15", likes: 94 },
          { id: 3, title: "React-ын үндсэн ойлголтууд", duration: "15:30", likes: 156 }
        ]
      },
      {
        id: 2,
        title: "React Hooks-ийн гүнзгий судалгаа",
        lessons: [
          { id: 4, title: "useState ба useEffect", duration: "18:45", likes: 203 },
          { id: 5, title: "State удирдлагад useContext ашиглах", duration: "20:10", likes: 178 },
          { id: 6, title: "Custom Hooks үүсгэх", duration: "25:30", likes: 165 }
        ]
      }
    ]
  };
  
  useEffect(() => {
    // Хэрэглэгч нэвтэрсэн эсэх, админ эсэхийг шалгах
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
    
    // Жинхэнэ апп-д courseId ашиглан курсийн мэдээллийг серверээс авах
    // Одоохондоо mock мэдээллийг ашиглаж байна
    setCourse(mockCourse);
  }, [navigate, courseId]);
  
  if (!user || !course) return null; // Хүлээгдэж байгаа үед юу ч харуулахгүй
  
  // Нийт хичээлийн тоо тооцох
  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length, 0
  );
  
  // Нийт хугацаа (секундээр)
  const totalDuration = course.sections
    .flatMap(section => section.lessons)
    .reduce((acc, lesson) => {
      const [minutes, seconds] = lesson.duration.split(':').map(Number);
      return acc + minutes * 60 + seconds;
    }, 0);
  
  // Хугацааг цаг, минут, секунд болгон хөрвүүлэх функц
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours > 0 ? `${hours} цаг` : null,
      minutes > 0 ? `${minutes} мин` : null,
      hours === 0 ? `${secs} сек` : null
    ].filter(Boolean).join(' ');
  };
  
  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />
      
      <div className="container mx-auto pt-24 px-4 pb-12">
        <Button 
          variant="ghost" 
          className="text-techhub-blue mb-6"
          onClick={() => navigate("/admin/courses")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Курсүүд рүү буцах
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">{course.title}</h1>
            <p className="text-gray-400 mt-1">Курсийн дэлгэрэнгүй</p>
          </div>
          
          <Badge 
            className={course.status === 'active' ? 'bg-green-500 mt-4 md:mt-0' : 'bg-yellow-500 mt-4 md:mt-0'}
          >
            {course.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт суралцагчид</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center">
                <Users className="h-5 w-5 text-techhub-blue mr-2" />
                {course.students}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт хичээлүүд</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white flex items-center">
                <Video className="h-5 w-5 text-techhub-blue mr-2" />
                {totalLessons}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Нийт үргэлжлэх хугацаа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatDuration(totalDuration)}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Курсийн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-gray-300 text-sm">Сургалтын багш</h3>
                <p className="text-white">{course.instructor}</p>
              </div>
              <div>
                <h3 className="text-gray-300 text-sm">Үнэ</h3>
                <p className="text-white">{course.price}₮</p>
              </div>
              <div>
                <h3 className="text-gray-300 text-sm">Үүссэн огноо</h3>
                <p className="text-white">{new Date(course.created).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-gray-300 text-sm">Тайлбар</h3>
                <p className="text-white">{course.description}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border border-techhub-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Хэсгүүд ба Хичээлүүд</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.sections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-techhub-blue font-medium mb-2">{section.title}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Хичээл</TableHead>
                        <TableHead className="text-gray-300">Үргэлжлэх хугацаа</TableHead>
                        <TableHead className="text-gray-300">Дуртай</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.lessons.map(lesson => (
                        <TableRow key={lesson.id}>
                          <TableCell className="text-white">{lesson.title}</TableCell>
                          <TableCell className="text-gray-300">{lesson.duration}</TableCell>
                          <TableCell className="text-gray-300">{lesson.likes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetails;
