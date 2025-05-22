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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form schema using Zod
const formSchema = z.object({
  title: z.string().min(5, { message: "Гарчиг дор хаяж 5 тэмдэгттэй байх ёстой." }),
  description: z.string().min(20, { message: "Тодорхойлолт дор хаяж 20 тэмдэгттэй байх ёстой." }),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Үнэ зөв тоо байх ёстой.",
  }),
});

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>(null);

  // Mock course data (replace with API fetch in real app)
  const mockCourse = {
    id: 1,
    title: "Орчин үеийн React хөгжүүлэлт",
    description:
      "Орчин үеийн React-г hooks, context болон дэвшилтэт загваруудтай эзэмшээрэй. Энэ сургалт эхнээс нь эхлээд дэвшилтэт ойлголт хүртэл бүхнийг хамарна.",
    price: "49.99",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    // Нэвтрэлт ба эрх шалгах
    const userFromStorage = localStorage.getItem("user");
    if (!userFromStorage) {
      navigate("/instructor/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userFromStorage);
      if (parsedUser.role !== "instructor") {
        navigate("/instructor/login");
        return;
      }
      setUser(parsedUser);
    } catch {
      navigate("/instructor/login");
      return;
    }

    // Формаа mock өгөгдлөөр дүүргэх (жишээ)
    form.reset({
      title: mockCourse.title,
      description: mockCourse.description,
      price: mockCourse.price,
    });
  }, [navigate, courseId, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // API дуудлагын симуляци
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Курс шинэчлэгдлээ",
        description: "Таны курс амжилттай шинэчлэгдлээ.",
      });
      navigate("/instructor/dashboard");
    }, 1000);
  };

  if (!user) return null;

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
          Хяналтын самбар руу буцах
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-mono font-bold text-white mb-6">Курсыг засах</h1>

          <div className="bg-black/20 p-6 rounded-lg border border-techhub-blue/20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Курсын гарчиг</FormLabel>
                      <FormControl>
                        <Input placeholder="Жишээ: Орчин үеийн React хөгжүүлэлт" {...field} />
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
                      <FormLabel className="text-white">Курсын тодорхойлолт</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Курсын тухай дэлгэрэнгүй бичнэ үү..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Курсын үнэ (₮)</FormLabel>
                      <FormControl>
                        <Input placeholder="Жишээ: 49.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-techhub-blue/50 text-techhub-blue hover:bg-techhub-blue/10"
                    onClick={() => navigate(`/instructor/manage-lessons/${courseId}`)}
                  >
                    Хичээлүүдийг удирдах
                  </Button>

                  <Button type="submit" className="bg-techhub-blue hover:bg-techhub-blue/80" disabled={isLoading}>
                    {isLoading ? "Хадгалж байна..." : "Курсыг хадгалах"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
