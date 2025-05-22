import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";

// Формаар дамжуулж байгаа өгөгдлийн схем
const formSchema = z
  .object({
    title: z.string().min(5, { message: "Гарчиг дор хаяж 5 тэмдэгттэй байх ёстой." }),
    description: z.string().min(20, { message: "Тайлбар дор хаяж 20 тэмдэгттэй байх ёстой." }),
    type: z.string({ required_error: "Хичээлийн төрлийг сонгоно уу." }),
    section: z.string({ required_error: "Хэсгийг сонгоно уу." }),
    duration: z.string().regex(/^\d+:\d{2}$/, { message: "Урт нь MM:SS хэлбэртэй байх ёстой." }),
    videoUrl: z.string().url({ message: "Зөв URL оруулна уу." }).optional(),
  })
  .superRefine(({ type, videoUrl }, ctx) => {
    // Хэрвээ төрлийг video гэж сонгосон бол videoUrl заавал байх ёстой
    if (type === "video" && (!videoUrl || videoUrl.trim() === "")) {
      ctx.addIssue({
        path: ["videoUrl"],
        message: "Video төрлийн хичээлд Video URL заавал шаардлагатай.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// Хичээлийн хэсгүүдийн mock өгөгдөл
const mockSections = [
  { id: "1", title: "Advanced React-ийн танилцуулга" },
  { id: "2", title: "React Hooks-ийн гүнзгий ойлголт" },
  { id: "3", title: "Advanced State Management" },
  { id: "4", title: "Гүйцэтгэлийн оновчлол" },
  { id: "5", title: "Advanced Component загварууд" },
];

const AddLesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Хэрэглэгчийн эрхийг шалгах (захиалагч эсвэл орж байгаа эсэх)
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
  }, [navigate]);

  // Форм үүсгэж байна
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "video",
      section: "",
      duration: "",
      videoUrl: "",
    },
  });

  // Form-ийн type талбарыг хянах
  const lessonType = form.watch("type");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Жишээ API дуудлага (1 секунд хүлээх)
    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: "Хичээл амжилттай нэмэгдлээ!",
        description: "Шинээр нэмэгдсэн хичээл курсэд нэмэгдсэн байна.",
      });

      navigate(`/instructor/manage-lessons/${courseId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />

      <div className="container mx-auto pt-24 px-4 pb-12">
        <Button
          variant="ghost"
          className="text-techhub-blue mb-6"
          onClick={() => navigate(`/instructor/manage-lessons/${courseId}`)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Хичээлүүд рүү буцах
        </Button>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-mono font-bold text-white mb-6">Шинэ хичээл нэмэх</h1>

          <div className="bg-black/20 p-6 rounded-lg border border-techhub-blue/20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Хичээлийн гарчиг</FormLabel>
                      <FormControl>
                        <Input placeholder="Жишээ: React Hooks-ийн танилцуулга" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Хичээлийн тайлбар</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Энэ хичээлийн талаар дэлгэрэнгүй тайлбар бичнэ үү..."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Хэсэг</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Хэсэг сонгоно уу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockSections.map((section) => (
                              <SelectItem key={section.id} value={section.id}>
                                {section.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Хичээлийн төрөл</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Төрөл сонгоно уу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="video">Видео</SelectItem>
                            <SelectItem value="article">Нийтлэл</SelectItem>
                            <SelectItem value="quiz">Шалгалт</SelectItem>
                            <SelectItem value="assignment">Даалгавар</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Урт (MM:SS)</FormLabel>
                        <FormControl>
                          <Input placeholder="Жишээ: 15:30" {...field} />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Формат: минут:секунд (жишээ: 15:30)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {lessonType === "video" && (
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Видео URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Жишээ: https://youtube.com/watch?v=..." {...field} />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            YouTube, Vimeo эсвэл шууд видео URL
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-techhub-blue w-full mt-2"
                >
                  {isLoading ? "Нэмэгдэж байна..." : "Хичээл нэмэх"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
