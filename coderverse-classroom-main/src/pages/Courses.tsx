import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/CourseCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/NavBar";
import { Search } from "lucide-react";

// Mock data
const mockCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    description: "Орчин үеийн React-г hooks, context, дэвшилтэт загваруудтай эзэмшээрэй",
    duration: "12 цаг",
    students: 1234,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    price: 99,
    category: "Frontend",
    isOwned: true,
    isLiked: true,
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Өгөгдөл шинжилгээ ба машин сургалтын Python хичээл",
    duration: "15 цаг",
    students: 2156,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
    price: 89,
    category: "Data Science",
    isOwned: false,
    isLiked: true,
  },
  {
    id: 3,
    title: "Full Stack JavaScript",
    description: "Node.js, Express ашиглан вэб аппликэйшн бүтээх",
    duration: "20 цаг",
    students: 1789,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074",
    price: 129,
    category: "Full Stack",
    isOwned: true,
    isLiked: false,
  },
  {
    id: 4,
    title: "Cyber Security Fundamentals",
    description: "Систем ба сүлжээг цахим халдлагаас хамгаалах үндэс",
    duration: "18 цаг",
    students: 1356,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074",
    price: 149,
    category: "Security",
    isOwned: false,
    isLiked: false,
  },
  {
    id: 5,
    title: "Machine Learning with TensorFlow",
    description: "TensorFlow, Keras ашиглан ухаалаг аппликэйшн бүтээх",
    duration: "22 цаг",
    students: 1987,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070",
    price: 159,
    category: "Data Science",
    isOwned: false,
    isLiked: true,
  },
  {
    id: 6,
    title: "DevOps and CI/CD Pipelines",
    description: "Орчин үеийн CI/CD хэрэгслээр DevOps практик хэрэгжүүлэх",
    duration: "16 цаг",
    students: 1245,
    image: "https://images.unsplash.com/photo-1561164517-686f490ee86d?q=80&w=2069",
    price: 119,
    category: "DevOps",
    isOwned: true,
    isLiked: false,
  },
];

const categories = [
  "Бүх категори",
  "Frontend",
  "Backend",
  "Full Stack",
  "Өгөгдлийн Шинжлэх Ухаан",
  "DevOps",
  "Аюулгүй Байдал",
];

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Бүх категори");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = mockCourses.filter((course) => {
    if (activeTab === "own" && !course.isOwned) return false;
    if (activeTab === "liked" && !course.isLiked) return false;

    // Категорийн шүүлтүүр
    if (selectedCategory !== "Бүх категори" && course.category !== selectedCategory) return false;

    // Хайлтын шүүлтүүр
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        {/* Толгой хэсэг */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">Курс судлах</h1>
          <p className="text-gray-400">Мэргэжлийн ур чадвараа дээшлүүлэх чанартай сургалтуудыг олж нээнэ үү</p>
        </div>

        {/* Шүүлтүүр ба Хайлтын хэсэг */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              placeholder="Курс хайх..."
              className="bg-techhub-dark border-techhub-blue/30 text-white pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <div className="w-full md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-techhub-dark border-techhub-blue/30 text-white">
                <SelectValue placeholder="Бүх категори" />
              </SelectTrigger>
              <SelectContent className="bg-techhub-dark border-techhub-blue/30 text-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Табы */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-techhub-dark border border-techhub-blue/30 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-techhub-blue data-[state=active]:text-white"
            >
              Бүх курс
            </TabsTrigger>
            <TabsTrigger
              value="own"
              className="data-[state=active]:bg-techhub-blue data-[state=active]:text-white"
            >
              Миний курс
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="data-[state=active]:bg-techhub-blue data-[state=active]:text-white"
            >
              Дуртай курс
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-xl">Курс олдсонгүй. Шүүлтүүрээ өөрчилнө үү.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Хуудсан */}
        {filteredCourses.length > 0 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
