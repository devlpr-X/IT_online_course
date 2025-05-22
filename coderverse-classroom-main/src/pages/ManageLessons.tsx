import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockCourse = {
  id: 1,
  title: "React хөгжүүлэлтийн ахисан түвшин",
  description: "Hooks, context болон React-ийн ахисан ойлголтуудыг бүрэн эзэмшээрэй.",
  sections: [
    {
      id: 1,
      title: "React-ийн ахисан ойлголтын танилцуулга",
      lessons: [
        { id: 1, title: "Курсын ерөнхий тойм", duration: "5:20", type: "video", likes: 128, description: "Курсын бүтэц, зорилгыг ерөнхийд нь танилцуулна." },
        { id: 2, title: "Хөгжүүлэлтийн орчны тохиргоо", duration: "10:15", type: "video", likes: 94, description: "React хөгжүүлэлтийн орчноо хэрхэн тохируулахыг сурна." },
        { id: 3, title: "React-ийн үндсэн ойлголтууд", duration: "15:30", type: "video", likes: 156, description: "React-ийн гол концепцүүдийн талаар дэлгэрэнгүй тайлбарлана." }
      ]
    },
    {
      id: 2,
      title: "React Hooks-ийн нарийвчилсан судалгаа",
      lessons: [
        { id: 4, title: "useState ба useEffect", duration: "18:45", type: "video", likes: 203, description: "React-д хамгийн өргөн хэрэглэгддэг hooks-уудыг судална." },
        { id: 5, title: "useContext ашиглан төлөв удирдах нь", duration: "20:10", type: "video", likes: 178, description: "Context ашиглан төлөвийг хэрхэн удирдахыг үзнэ." },
        { id: 6, title: "Custom Hooks", duration: "25:30", type: "video", likes: 165, description: "Custom hooks ашиглан дахин ашиглагдах логик үүсгэнэ." }
      ]
    }
  ]
};

const ManageLessons = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();
  const [course, setCourse] = useState(mockCourse);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
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
  }, [navigate, courseId]);

  const handleAddLesson = () => {
    navigate(`/instructor/add-lesson/${courseId}`);
  };

  const handleEditLesson = (lessonId: number) => {
    navigate(`/instructor/edit-lesson/${courseId}/${lessonId}`);
  };

  const handleDeleteLesson = (lessonId: number) => {
    let lessonFound = false;
    const updatedSections = course.sections.map(section => {
      const lessons = section.lessons.filter(lesson => {
        if (lesson.id === lessonId) {
          lessonFound = true;
          return false;
        }
        return true;
      });
      return {
        ...section,
        lessons,
      };
    });

    if (lessonFound) {
      setCourse({
        ...course,
        sections: updatedSections,
      });

      toast({
        title: "Хичээл устгагдлаа",
        description: "Хичээлийг амжилттай устгалаа.",
      });
    }
  };

  const viewLessonDetails = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setIsDialogOpen(true);
  };

  const findLessonById = (lessonId: number) => {
    for (const section of course.sections) {
      const lesson = section.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  };

  const selectedLesson = selectedLessonId ? findLessonById(selectedLessonId) : null;

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />

      <div className="container mx-auto pt-24 px-4 pb-12">
        <Button 
          variant="ghost" 
          className="text-techhub-blue mb-6"
          onClick={() => navigate("/instructor/dashboard")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Хянах самбар руу буцах
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-white">{course.title}</h1>
            <p className="text-gray-400 mt-1">Курсын хичээлүүдийг удирдах</p>
          </div>

          <Button 
            className="mt-4 md:mt-0 bg-techhub-blue hover:bg-techhub-blue/80"
            onClick={handleAddLesson}
          >
            <Plus className="mr-1 h-4 w-4" />
            Шинэ хичээл нэмэх
          </Button>
        </div>

        <div className="bg-black/20 rounded-lg border border-techhub-blue/20 overflow-hidden">
          {course.sections.map((section, sectionIndex) => (
            <div key={section.id}>
              <div className="p-4 bg-black/30 border-b border-techhub-blue/20">
                <h2 className="font-mono font-bold text-white">Хэсэг {sectionIndex + 1}: {section.title}</h2>
              </div>

              <div>
                {section.lessons.map((lesson, lessonIndex) => (
                  <div 
                    key={lesson.id} 
                    className="p-4 border-b border-techhub-blue/20 hover:bg-white/5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-techhub-blue/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 text-techhub-blue text-sm">
                          {lessonIndex + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{lesson.title}</h3>
                          <p className="text-gray-400 text-sm">{lesson.duration} • {lesson.type}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4 md:mt-0">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                          onClick={() => viewLessonDetails(lesson.id)}
                        >
                          Дэлгэрэнгүй
                        </Button>

                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                          onClick={() => handleEditLesson(lesson.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDeleteLesson(lesson.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Хичээлийн дэлгэрэнгүй цонх */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black/70 border-techhub-blue/20">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedLesson?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Хичээлийн дэлгэрэнгүй болон статистик
            </DialogDescription>
          </DialogHeader>

          {selectedLesson && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-3 rounded-md">
                  <p className="text-sm text-gray-400">Хугацаа</p>
                  <p className="text-lg text-white">{selectedLesson.duration}</p>
                </div>

                <div className="bg-black/30 p-3 rounded-md">
                  <p className="text-sm text-gray-400">Төрөл</p>
                  <p className="text-lg text-white capitalize">{selectedLesson.type}</p>
                </div>

                <div className="bg-black/30 p-3 rounded-md">
                  <p className="text-sm text-gray-400">Лайк</p>
                  <p className="text-lg text-white">{selectedLesson.likes}</p>
                </div>
              </div>

              <Separator className="bg-techhub-blue/20" />

              <div>
                <h4 className="text-white font-medium mb-2">Тайлбар</h4>
                <p className="text-gray-300">
                  {selectedLesson.description || "Энэ хичээл сэдвийн талаарх тодорхой тайлбар, жишээтэйгээр өгөгдөнө."}
                </p>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <Button 
                  variant="outline"
                  className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                  onClick={() => handleEditLesson(selectedLesson.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Засварлах
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageLessons;
