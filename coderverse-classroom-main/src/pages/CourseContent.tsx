import { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import CourseContent from "@/components/CourseContent";
import VideoPlayer from "@/components/VideoPlayer";
import CourseComments from "@/components/CourseComments";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Book, Clock, Users, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

// Хичээлийн хөтөлбөрийн жишээ мэдээлэл
const mockCourse = {
  id: 1,
  title: "React хөгжүүлэлтийн дээд шат",
  description: "React-ийн hooks, context болон дээд түвшний загваруудыг эзэмших. Энэ бүрэн курс нь React програмуудыг мэргэжлийн түвшинд бүтээхэд шаардлагатай бүх зүйлийг заана.",
  duration: "12 цаг",
  students: 1234,
  category: "Фронтенд",
  instructor: "Жон Доу",
  rating: 4.8,
  totalReviews: 354,
  lastUpdated: "2023 оны 4-р сар",
  language: "Англи",
  sections: [
    {
      id: 1,
      title: "React-ийн дээд шатны танилцуулга",
      lessons: [
        { id: 1, title: "Курсийн тойм", duration: "5:20", type: "video", likes: 128, description: "Курсийн нийт агуулга ба зорилгуудыг тоймлон үзүүлнэ." },
        { id: 2, title: "Хөгжүүлэлтийн орчныг тохируулах", duration: "10:15", type: "video", likes: 94, description: "React хөгжүүлэх орчноо хэрхэн тохируулахыг сурах." },
        { id: 3, title: "React-ийн үндсэн ойлголтууд", duration: "15:30", type: "video", likes: 156, description: "React-ийн үндсэн ойлголтуудыг гүнзгий судална." }
      ]
    },
    {
      id: 2,
      title: "React Hooks гүнзгийрүүлсэн",
      lessons: [
        { id: 4, title: "useState болон useEffect", duration: "18:45", type: "video", likes: 203, description: "Хамгийн их ашиглагддаг React hooks-ийг эзэмших." },
        { id: 5, title: "useContext ашиглан төлөв удирдах", duration: "20:10", type: "video", likes: 178, description: "Компонентуудын хооронд state-ийг удирдах context-ийг сурах." },
        { id: 6, title: "Өөрийн Hooks үүсгэх", duration: "25:30", type: "video", likes: 165, description: "Дахин ашиглах боломжтой React hooks бүтээх." },
        { id: 7, title: "Hooks ашиглах шилдэг аргууд", duration: "15:20", type: "video", likes: 142, description: "React hooks-ийг үр дүнтэй ашиглах шилдэг дадал." }
      ]
    },
    {
      id: 3,
      title: "Дээд шатны state удирдлага",
      lessons: [
        { id: 8, title: "Context API гүнзгий судалгаа", duration: "22:15", type: "video", likes: 189, description: "Context API-г state удирдлагад ашиглах аргуудыг судлах." },
        { id: 9, title: "Redux ба Context харьцуулалт", duration: "18:30", type: "video", likes: 215, description: "Redux болон Context-ийг state удирдлагаар харьцуулах." },
        { id: 10, title: "Өөрийн state удирдлагын шийдэл бүтээх", duration: "30:45", type: "video", likes: 167, description: "Өөрийн state удирдлагын системийг хөгжүүлэх." }
      ]
    },
    {
      id: 4,
      title: "Гүйцэтгэлийн оновчлол",
      lessons: [
        { id: 11, title: "Гүйцэтгэлийн саад бэрхшээл илрүүлэх", duration: "17:25", type: "video", likes: 124, description: "React аппликейшнуудын гүйцэтгэлийн асуудлуудыг олж мэдэх." },
        { id: 12, title: "useMemo болон useCallback ашиглах", duration: "24:10", type: "video", likes: 148, description: "Гүйцэтгэлийг оновчлох useMemo ба useCallback." },
        { id: 13, title: "React.memo ба цэвэр компонентууд", duration: "19:45", type: "video", likes: 136, description: "React.memo-г ашиглан компонентуудыг оновчлох." },
        { id: 14, title: "Lazy Loading ба Код хуваах", duration: "22:30", type: "video", likes: 158, description: "Анхны ачаалалтыг сайжруулах lazy loading ашиглах." }
      ]
    },
    {
      id: 5,
      title: "Дээд шатны компонент загварууд",
      lessons: [
        { id: 15, title: "Higher-Order Components (HOCs)", duration: "28:15", type: "video", likes: 171, description: "Higher-Order Components бүтээх болон ашиглахыг сурах." },
        { id: 16, title: "Render Props загвар", duration: "23:40", type: "video", likes: 143, description: "Компонентуудыг уялдуулах render props загварыг эзэмших." },
        { id: 17, title: "Compound Components", duration: "26:55", type: "video", likes: 162, description: "Нарийвчилсан UI-д зориулсан уян хатан compound components бүтээх." },
        { id: 18, title: "Context Module функцууд", duration: "20:30", type: "video", likes: 138, description: "State удирдлагад зориулсан context module функцуудыг хэрэгжүүлэх." }
      ]
    }
  ]
};

// Сэтгэгдлийн жишээ мэдээлэл
const mockComments = [
  {
    id: 1,
    user: "Санчир Бат",
    avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    date: "2 хоногийн өмнө",
    content: "Энэ хичээл үнэхээр тус болсон! Тайлбарууд ойлгомжтой байсан ба жишээнүүд нь ойлгоход хялбар болгосон. Заагч маань төвөгтэй сэдвүүдийг хэрхэн задлан ойлгуулахыг маш сайн хийсэн.",
    rating: 5
  },
  {
    id: 2,
    user: "Гантулга",
    avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    date: "1 долоо хоногийн өмнө",
    content: "Агуулга сайн, гэхдээ дадлага хийх илүү олон дасгал байгаасай гэж хүссэн. Онолын тайлбарууд маш сайн байна.",
    rating: 4
  },
  {
    id: 3,
    user: "Бат",
    avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    date: "2 долоо хоногийн өмнө",
    content: "Энэ ойлголтыг удаан хугацаанд ойлгох гэж оролдсон, харин энэ хичээл надад ойлгомжтой болголоо. Дүрслэлүүд үнэхээр ашигтай байсан.",
    rating: 5
  }
];

// Хичээлийг ID-ээр хайх функц
const findLessonById = (sections, lessonId) => {
  for (const section of sections) {
    const lesson = section.lessons.find(lesson => lesson.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
};

// Бүх хичээлийг нэг жагсаалт болгож авах функц
const getAllLessons = (sections) => {
  return sections.flatMap(section => section.lessons);
};

// Өмнөх ба дараагийн хичээлийг олох функц
const getAdjacentLessons = (sections, currentLessonId) => {
  const allLessons = getAllLessons(sections);
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  
  return { previousLesson, nextLesson };
};

const CourseContentPage = () => {
  const { courseId } = useParams();
  const course = mockCourse; // Жишээ байдлаар курсийн өгөгдлийг courseId-аар авах
  
  const allLessons = getAllLessons(course.sections);
  const [currentLessonId, setCurrentLessonId] = useState(allLessons[0].id);
  const currentLesson = findLessonById(course.sections, currentLessonId);
  
  const { previousLesson, nextLesson } = getAdjacentLessons(course.sections, currentLessonId);
  
  const progressPercentage = ((allLessons.findIndex(lesson => lesson.id === currentLessonId) + 1) / allLessons.length) * 100;
  
  const handleSelectLesson = (lesson) => {
    setCurrentLessonId(lesson.id);
  };
  
  return (
    <div className="min-h-screen bg-techhub-dark flex flex-col">
      <NavBar />
      
      {/* Курсийн гарчиг ба явц */}
      <div className="bg-black/20 border-b border-techhub-blue/20 mt-16">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="space-y-1">
            <Badge className="mb-1 bg-techhub-blue">{course.category}</Badge>
            <h1 className="text-xl font-mono font-bold text-white">{course.title}</h1>
          </div>
          <div className="flex flex-col mt-2 md:mt-0 w-full md:w-1/3">
            <div className="text-xs text-gray-300 flex justify-between mb-1">
              <span>Таны явц</span>
              <span>{Math.round(progressPercentage)}% гүйцэтгэл</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-gray-700" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Видео болон хичээлийн агуулга */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {currentLesson && <VideoPlayer lesson={currentLesson} />}
            
            {/* Дараагийн болон өмнөх хичээлийн товчнууд */}
            <div className="flex justify-between mt-6 space-x-4">
              <Button 
                variant="outline" 
                className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                disabled={!previousLesson}
                onClick={() => previousLesson && setCurrentLessonId(previousLesson.id)}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Өмнөх хичээл
              </Button>
              
              <Button 
                className="bg-techhub-blue hover:bg-techhub-blue/80"
                disabled={!nextLesson}
                onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
              >
                Дараах хичээл
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <Separator className="my-6 bg-techhub-blue/20" />
            
            {/* Энэ хичээлийн талаарх мэдээлэл */}
            <div className="mb-8">
              <h3 className="text-xl font-mono font-bold text-white mb-4">Энэ хичээлийн тухай</h3>
              <p className="text-gray-300">
                {currentLesson?.description || `${currentLesson?.title} - Энэ хичээл нь тухайн сэдвийн дэлгэрэнгүй тоймыг үзүүлж, практик жишээнүүд болон гүнзгий тайлбаруудыг агуулна. Заагчийн удирдамжийг даган суралцаарай.`}
              </p>
            </div>
            
            {/* Сурагчдын сэтгэгдэл */}
            <Separator className="my-6 bg-techhub-blue/20" />
            <div className="mb-8">
              <h3 className="text-xl font-mono font-bold text-white mb-6">Сурагчдын сэтгэгдэл</h3>
              <CourseComments comments={mockComments} />
            </div>
          </div>
        </div>
        
        {/* Хажуугийн самбар - Курсийн агуулга */}
        <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-techhub-blue/20 bg-black/10 overflow-y-auto">
          <div className="p-4 border-b border-techhub-blue/20 sticky top-0 bg-black/30 backdrop-blur-sm z-10">
            <h3 className="font-mono font-bold text-white">Курсийн агуулга</h3>
            <p className="text-sm text-gray-400 mt-1">
              {allLessons.length} хичээл • {course.duration}
            </p>
          </div>
          <CourseContent 
            sections={course.sections} 
            isCollapsible={false}
            currentLessonId={currentLessonId}
            onSelectLesson={handleSelectLesson}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;
