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

const AdminUsers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Хэрэглэгчдийн жишээ өгөгдөл
  const users = [
    { id: 1, name: "Баатар Очир", email: "baatar@example.com", role: "student", joined: "2023-04-14", status: "active" },
    { id: 2, name: "Солонго Энх", email: "solongo@example.com", role: "student", joined: "2023-04-12", status: "active" },
    { id: 3, name: "Ганзориг Бат", email: "ganzorig@example.com", role: "instructor", joined: "2023-04-10", status: "active" },
    { id: 4, name: "Нарантуяа Мөнх", email: "narantuya@example.com", role: "student", joined: "2023-04-08", status: "inactive" },
    { id: 5, name: "Тэмүүлэн Сүх", email: "temuulen@example.com", role: "instructor", joined: "2023-04-05", status: "active" },
    { id: 6, name: "Амарзаяа Баяр", email: "amarzayaa@example.com", role: "student", joined: "2023-04-03", status: "active" },
    { id: 7, name: "Дөлгөөн Энхбат", email: "dolgoon@example.com", role: "student", joined: "2023-04-01", status: "active" },
  ];
  

  
  useEffect(() => {
    // Хэрэглэгч нэвтэрсэн ба админ эсэхийг шалгах
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
  
  // Хайлт хийхэд хэрэглэгчдийн жагсаалтыг шүүж харуулах
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!user) return null; // Нэвтрэлтийн шалгалт хийгдэх хүртэл юу ч харуулахгүй байх
  
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
          Буцах хяналтын самбар руу
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">Хэрэглэгчийн удирдлага</h1>
            <p className="text-gray-400 mt-1">Бүх хэрэглэгчдийг харах, удирдах</p>
          </div>
          
          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Хэрэглэгч хайх..."
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
                <TableHead className="text-gray-300">Нэр</TableHead>
                <TableHead className="text-gray-300">И-мэйл</TableHead>
                <TableHead className="text-gray-300">Үүрэг</TableHead>
                <TableHead className="text-gray-300">Статус</TableHead>
                <TableHead className="text-gray-300">Нэгдсэн огноо</TableHead>
                <TableHead className="text-gray-300">Үйлдлүүд</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(userData => (
                <TableRow key={userData.id}>
                  <TableCell className="text-white font-medium">{userData.name}</TableCell>
                  <TableCell className="text-gray-300">{userData.email}</TableCell>
                  <TableCell>
                    <Badge 
                      className={userData.role === 'instructor' ? 'bg-techhub-blue' : 'bg-gray-500'}
                    >
                      {userData.role === 'instructor' ? 'Багш' : 'Оюутан'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={userData.status === 'active' ? 'bg-green-500' : 'bg-red-500'}
                    >
                      {userData.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(userData.joined).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                      onClick={() => navigate(`/admin/users/${userData.id}`)}
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

export default AdminUsers;
