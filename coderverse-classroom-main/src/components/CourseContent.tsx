import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Clock, Video, File, Play } from "lucide-react";

interface Lesson {
  id: number;           // Хичээлийн ID
  title: string;        // Хичээлийн гарчиг
  duration: string;     // Хичээлийн үргэлжлэх хугацаа (формат: "мин:сек")
  type: string;         // Хичээлийн төрөл (жишээ нь: "video" эсвэл "file")
}

interface Section {
  id: number;           // Хэсгийн ID
  title: string;        // Хэсгийн гарчиг
  lessons: Lesson[];    // Хичээлийн жагсаалт
}

interface CourseContentProps {
  sections: Section[];                 // Хэсгүүдийн массив
  isCollapsible?: boolean;             // Хэсгүүдийг эвхэж болох эсэх
  currentLessonId?: number;            // Одоогийн идэвхтэй хичээлийн ID
  onSelectLesson?: (lesson: Lesson) => void;  // Хичээлийг сонгох callback функц
}

const CourseContent = ({ 
  sections, 
  isCollapsible = false, 
  currentLessonId,
  onSelectLesson 
}: CourseContentProps) => {
  // Эвхэгдсэн хэсгүүдийн ID-уудын массив
  const [expandedSections, setExpandedSections] = useState<string[]>(
    isCollapsible ? [] : sections.map(section => `section-${section.id}`)
  );

  // Нийт хичээлийн тоо
  const totalLessons = sections.reduce((total, section) => total + section.lessons.length, 0);

  // Нийт хугацааг тооцоолох
  const totalDuration = sections.reduce((total, section) => {
    return total + section.lessons.reduce((sectionTotal, lesson) => {
      const [minutes, seconds] = lesson.duration.split(':').map(Number);
      return sectionTotal + minutes + (seconds / 60);
    }, 0);
  }, 0);

  // Хугацааг цаг, минут болгон форматлах
  const formattedTotalDuration = `${Math.floor(totalDuration)} цаг ${Math.round((totalDuration % 1) * 60)} мин`;

  return (
    <div className="space-y-4">
      {isCollapsible && (
        <div className="flex items-center justify-between mb-4 text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              <span>{totalLessons} хичээл</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{formattedTotalDuration}</span>
            </div>
          </div>
        </div>
      )}

      {isCollapsible ? (
        // Эвхэгддэг аккордеон, нэг зэрэг зөвхөн нэг хэсэг нээгдэнэ
        <Accordion 
          type="single"
          collapsible={true}
          value={expandedSections.length ? expandedSections[0] : undefined}
          onValueChange={(value) => setExpandedSections(value ? [value] : [])}
          className="border border-techhub-blue/20 rounded-lg overflow-hidden"
        >
          {sections.map((section, index) => (
            <AccordionItem 
              key={section.id} 
              value={`section-${section.id}`}
              className={index !== sections.length - 1 ? "border-b border-techhub-blue/20" : ""}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                <div className="flex items-start text-left">
                  <div>
                    <h4 className="font-semibold text-white">{section.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {section.lessons.length} хичээл • 
                      {section.lessons.reduce((total, lesson) => {
                        const [min, sec] = lesson.duration.split(':').map(Number);
                        return total + min + (sec / 60);
                      }, 0).toFixed(0)} мин
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 py-0">
                <ul className="divide-y divide-techhub-blue/20">
                  {section.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    
                    return (
                      <li 
                        key={lesson.id} 
                        className={`px-4 py-3 ${isActive ? 'bg-techhub-blue/20' : 'hover:bg-white/5'}`}
                      >
                        {onSelectLesson ? (
                          <button 
                            className="w-full flex items-start justify-between text-left"
                            onClick={() => onSelectLesson(lesson)}
                          >
                            <div className="flex items-center">
                              {isActive ? (
                                <Play className="h-4 w-4 mr-3 text-techhub-blue" />
                              ) : (
                                lesson.type === 'video' ? (
                                  <Video className="h-4 w-4 mr-3 text-gray-400" />
                                ) : (
                                  <File className="h-4 w-4 mr-3 text-gray-400" />
                                )
                              )}
                              <span className={`${isActive ? 'text-techhub-blue font-medium' : 'text-gray-300'}`}>
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                          </button>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              {lesson.type === 'video' ? (
                                <Video className="h-4 w-4 mr-3 text-gray-400" />
                              ) : (
                                <File className="h-4 w-4 mr-3 text-gray-400" />
                              )}
                              <span className="text-gray-300">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        // Эвхэгддэггүй аккордеон, олон хэсэг зэрэг нээгдэж болно
        <Accordion 
          type="multiple"
          value={expandedSections}
          onValueChange={setExpandedSections}
          className="border border-techhub-blue/20 rounded-lg overflow-hidden"
        >
          {sections.map((section, index) => (
            <AccordionItem 
              key={section.id} 
              value={`section-${section.id}`}
              className={index !== sections.length - 1 ? "border-b border-techhub-blue/20" : ""}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                <div className="flex items-start text-left">
                  <div>
                    <h4 className="font-semibold text-white">{section.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {section.lessons.length} хичээл • 
                      {section.lessons.reduce((total, lesson) => {
                        const [min, sec] = lesson.duration.split(':').map(Number);
                        return total + min + (sec / 60);
                      }, 0).toFixed(0)} мин
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 py-0">
                <ul className="divide-y divide-techhub-blue/20">
                  {section.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    
                    return (
                      <li 
                        key={lesson.id} 
                        className={`px-4 py-3 ${isActive ? 'bg-techhub-blue/20' : 'hover:bg-white/5'}`}
                      >
                        {onSelectLesson ? (
                          <button 
                            className="w-full flex items-start justify-between text-left"
                            onClick={() => onSelectLesson(lesson)}
                          >
                            <div className="flex items-center">
                              {isActive ? (
                                <Play className="h-4 w-4 mr-3 text-techhub-blue" />
                              ) : (
                                lesson.type === 'video' ? (
                                  <Video className="h-4 w-4 mr-3 text-gray-400" />
                                ) : (
                                  <File className="h-4 w-4 mr-3 text-gray-400" />
                                )
                              )}
                              <span className={`${isActive ? 'text-techhub-blue font-medium' : 'text-gray-300'}`}>
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                          </button>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              {lesson.type === 'video' ? (
                                <Video className="h-4 w-4 mr-3 text-gray-400" />
                              ) : (
                                <File className="h-4 w-4 mr-3 text-gray-400" />
                              )}
                              <span className="text-gray-300">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default CourseContent;
