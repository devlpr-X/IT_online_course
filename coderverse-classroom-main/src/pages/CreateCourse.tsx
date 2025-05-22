import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const formSchema = z.object({
  title: z.string().min(5, { message: "Гарчиг дор хаяж 5 тэмдэгт байх ёстой." }),
  description: z.string().min(20, { message: "Тайлбар дор хаяж 20 тэмдэгт байх ёстой." }),
  category: z.string({ required_error: "Ангиллаа сонгоно уу." }),
  duration: z.string().min(1, { message: "Урт хугацаа заавал байх ёстой." }),
  language: z.string().min(1, { message: "Хэл заавал байх ёстой." }),
  level: z.string({ required_error: "Хүндрэлийн түвшинг сонгоно уу." }),
  price: z.string().regex(/^\d+(\.\d{1,2})?"/, { message: "Үнэ зөв тоон утга байх ёстой." }),
});

const CreateCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
  }, [navigate]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      language: "English",
      level: "",
      price: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Курс амжилттай үүслээ!",
        description: "Таны шинэ курс амжилттай нэмэгдлээ.",
      });
      
      navigate("/instructor/dashboard");
    }, 1000);
  };
  
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
          Буцах
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-mono font-bold text-white mb-6">Шинэ курс үүсгэх</h1>
          
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
                        <Input placeholder="Жишээ: Дэвшилтэт JavaScript техникүүд" {...field} />
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
                      <FormLabel className="text-white">Курсын тайлбар</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Курсын дэлгэрэнгүй тайлбарыг оруулна уу..." 
                          className="min-h-32" 
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Ангилал</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Ангилал сонгоно уу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frontend">Фронтенд хөгжүүлэлт</SelectItem>
                            <SelectItem value="backend">Бэкенд хөгжүүлэлт</SelectItem>
                            <SelectItem value="fullstack">Фулл стек хөгжүүлэлт</SelectItem>
                            <SelectItem value="mobile">Мобайл хөгжүүлэлт</SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                            <SelectItem value="design">UI/UX дизайн</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Хүндрэлийн түвшин</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Түвшин сонгоно уу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Эхлэгч</SelectItem>
                            <SelectItem value="intermediate">Дунд шат</SelectItem>
                            <SelectItem value="advanced">Дэвшилтэт</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Урт хугацаа (цаг)</FormLabel>
                        <FormControl>
                          <Input placeholder="Жишээ: 12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Хэл</FormLabel>
                        <FormControl>
                          <Input placeholder="Жишээ: English" {...field} />
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
                        <FormLabel className="text-white">Үнэ (₮)</FormLabel>
                        <FormControl>
                          <Input placeholder="Жишээ: 49.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-techhub-blue hover:bg-techhub-blue/80 w-full md:w-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "Курс үүсгэж байна..." : "Курс үүсгэх"}
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

export default CreateCourse;
