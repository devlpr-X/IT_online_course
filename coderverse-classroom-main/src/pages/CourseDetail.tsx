import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Book, MessageCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import CourseContent from "@/components/CourseContent";
import VideoPlayer from "@/components/VideoPlayer";
import CourseComments from "@/components/CourseComments";

// Нэг курсийн жишээ өгөгдөл
const mockCourse = {
  id: 1,
  title: "Advanced React Development",
  description: "Орчин үеийн React-ыг hook, context болон advanced pattern-уудтайгаа хамт эзэмших. Энэ өргөн хүрээтэй курс нь мэргэжлийн React аппликейшн хөгжүүлэхэд шаардлагатай бүхий л зүйлийг заах болно. Та React-ийн хамгийн сүүлийн үеийн функцүүд, шилдэг дадал зуршлууд болон том хэмжээний аппликейшн хэрхэн бүтээхийг сурах болно.",
  longDescription: "React нь хэрэглэгчийн интерфэйс бүтээх хамгийн түгээмэл ашиглагддаг JavaScript номын сан юм. Энэ курс дээр та React-ийн advanced ойлголтуудыг гүнзгий судалж, мэргэжлийн, үйлдвэрлэлд бэлэн аппликейшн хэрхэн бүтээхийг сурах болно. Бид hook, context, performance сайжруулалт, тест бичих зэрэг бүх зүйлийг хамарна. Курс дуусах頃 таны React аппликейшн бүтээх ур чадвар сайжрах болно.",
  duration: "12 цаг",
  students: 1234,
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
  price: 99,
  category: "Frontend",
  instructor: "John Doe",
  rating: 4.8,
  totalReviews: 354,
  lastUpdated: "2023 оны 4 сар",
  language: "Англи",
  includes: [
    "12 цагийн видео хичээл",
    "5 кодлох дасгал",
    "10 татаж авах материал",
    "Мөнхийн хандах эрх",
    "Амжилтын гэрчилгээ"
  ],
  sections: [
    {
      id: 1,
      title: "Advanced React-н танилцуулга",
      lessons: [
        { id: 1, title: "Курсын тойм", duration: "5:20", type: "video" },
        { id: 2, title: "Хөгжүүлэлтийн орчин бүрдүүлэх", duration: "10:15", type: "video" },
        { id: 3, title: "React-ийн үндсэн ойлголтууд", duration: "15:30", type: "video" }
      ]
    },
    {
      id: 2,
      title: "React Hooks-ийн гүнзгий ойлголт",
      lessons: [
        { id: 4, title: "useState болон useEffect", duration: "18:45", type: "video" },
        { id: 5, title: "useContext - төлөв удирдах", duration: "20:10", type: "video" },
        { id: 6, title: "Өөрийн hook бичих", duration: "25:30", type: "video" },
        { id: 7, title: "Hooks-ийн шилдэг дадал", duration: "15:20", type: "video" }
      ]
    },
    {
      id: 3,
      title: "Advanced төлөв удирдлага",
      lessons: [
        { id: 8, title: "Context API гүнзгий судалгаа", duration: "22:15", type: "video" },
        { id: 9, title: "Redux vs Context", duration: "18:30", type: "video" },
        { id: 10, title: "Төлөв удирдлагын шийдэл боловсруулах", duration: "30:45", type: "video" }
      ]
    }
  ],
  comments: [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      date: "2 сар өмнө",
      content: "Энэ курс миний React ур чадварыг нэмэгдүүлэхэд яг хэрэгтэй байлаа. Тодорхой тайлбарласан ба жишээнүүд практиктай байна.",
      rating: 5
    },
    {
      id: 2,
      user: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=5",
      date: "1 сар өмнө",
      content: "Гайхалтай курс! Тусгай hook-уудын хэсэг надад их таалагдсан. React аппликейшн хэрхэн бүтэцлэх ойлголтыг өөрчилсөн.",
      rating: 4
    },
    {
      id: 3,
      user: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=8",
      date: "3 долоо хоногийн өмнө",
      content: "Багш нь нарийн төвөгтэй ойлголтуудыг ойлгоход хялбар тайлбарлаж өгдөг. Маш сайн зөвлөж байна!",
      rating: 5
    }
  ]
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentLesson, setCurrentLesson] = useState(mockCourse.sections[0].lessons[0]);
  
  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />
      
      {/* Курсийн толгой хэсэг */}
      <div className="bg-gradient-to-b from-techhub-blue/30 to-techhub-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Курсийн мэдээлэл */}
            <div className="lg:col-span-2">
              <Badge className="mb-4 bg-techhub-blue">{mockCourse.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">{mockCourse.title}</h1>
              
              <p className="text-gray-300 mb-6">{mockCourse.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{mockCourse.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{mockCourse.students} оюутан</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2">{mockCourse.rating} ({mockCourse.totalReviews} сэтгэгдэл)</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-300">
                  <span className="font-semibold">Багш:</span> {mockCourse.instructor}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Сүүлд шинэчлэгдсэн:</span> {mockCourse.lastUpdated}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Хэл:</span> {mockCourse.language}
                </p>
              </div>
            </div>
            
            {/* Курсийн карт */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-techhub-blue/20 rounded-lg overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img src={mockCourse.image} alt={mockCourse.title} className="object-cover w-full h-full" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-techhub-blue">{mockCourse.price.toFixed(2)}₮</span>
                  </div>
                  <Button className="w-full bg-techhub-blue hover:bg-techhub-blue/80 text-lg py-6">
                    Элсэх
                  </Button>
                  <Link to={`/course/${courseId}/content`}>
                    <Button variant="outline" className="w-full mt-2 border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10">
                      Хичээлийн хөтөлбөр харах
                    </Button>
                  </Link>
                  <div className="text-gray-300">
                    <h4 className="font-semibold mb-2">Энэ курс дараах зүйлсийг агуулна:</h4>
                    <ul className="space-y-2">
                      {mockCourse.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Book className="h-4 w-4 mr-2 text-techhub-blue" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Таб сонголт */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-techhub-dark border border-techhub-blue/30">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-techhub-blue data-[state=active]:text-white"
            >
              Тойм
            </TabsTrigger>
            <TabsTrigger 
              value="learn" 
              className="data-[state=active]:bg-techhub-blue data-[state=active]:text-white"
            >
              Хичээл үзэх
            </TabsTrigger>
            <TabsTrigger 
              value="comments" 
              className="data-[state=active]:bg-techhub-blue data-[state=active]:text-white"
            >
              Сэтгэгдэл
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <h2 className="text-2xl font-mono font-bold text-white mb-4">Курсын Тойм</h2>
            <p className="text-gray-300 mb-6">{mockCourse.longDescription}</p>
            
            <h3 className="text-xl font-mono font-bold text-white mb-4">Та юу сурна вэ?</h3>
            <CourseContent sections={mockCourse.sections} isCollapsible={true} />
          </TabsContent>
          
          <TabsContent value="learn" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <VideoPlayer lesson={currentLesson} />
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-sm border border-techhub-blue/20 rounded-lg overflow-hidden sticky top-4">
                  <div className="p-4 border-b border-techhub-blue/20">
                    <h3 className="font-mono font-bold text-white">Курсийн хичээлүүд</h3>
                  </div>
                  <CourseContent 
                    sections={mockCourse.sections} 
                    currentLessonId={currentLesson.id}
                    onSelectLesson={setCurrentLesson}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="mt-6">
            <h2 className="text-2xl font-mono font-bold text-white mb-6 flex items-center">
              <MessageCircle className="mr-2" /> Оюутны сэтгэгдэл
            </h2>
            <CourseComments comments={mockCourse.comments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;
