import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

// Формын схемийг zod ашиглан тодорхойлсон
const formSchema = z.object({
  email: z.string().email({ message: "Зөв и-мэйл хаяг оруулна уу." }),
  password: z.string().min(6, { message: "Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой." }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Үнэн бодит апп-д эндээс сервертэй холбогдож нэвтрэлтийг шалгана
    setTimeout(() => {
      setIsLoading(false);
      
      // Жишээ админ шалгалт (жинхэнэ апп-д backend хийх ёстой)
      if (values.email === "admin@example.com" && values.password === "password") {
        // Админы мэдээллийг localStorage-д хадгалах (жинхэнэ апп-д баталгаажуулалт хийх систем хэрэгтэй)
        localStorage.setItem("user", JSON.stringify({ 
          role: "admin",
          name: "Админ Хэрэглэгч",
          email: values.email
        }));
        
        toast({
          title: "Амжилттай нэвтэрлээ",
          description: "Тавтай морил, Админ!",
        });
        
        // Админ хяналтын самбар руу шилжих
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Нэвтрэлт амжилтгүй боллоо",
          description: "И-мэйл эсвэл нууц үг буруу байна. Жишээ: admin@example.com / password",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />
      
      <div className="container mx-auto pt-32 px-4">
        <div className="max-w-md mx-auto bg-black/20 p-6 rounded-lg border border-techhub-blue/20">
          <h1 className="text-2xl font-mono font-bold text-white mb-6">Админ Нэвтрэлт</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">И-мэйл</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Нууц үг</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-techhub-blue hover:bg-techhub-blue/80"
                  disabled={isLoading}
                >
                  {isLoading ? "Нэвтрэж байна..." : "Админээр нэвтрэх"}
                </Button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Жишээ нэвтрэх мэдээлэл: admin@example.com / password
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
