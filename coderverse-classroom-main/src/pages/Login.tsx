// Хэрэгтэй импортууд (React, router, form, icon, UI элементүүд)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { sendRequest, convertToMD5password } from "@/utils/api";
import { loginUser } from "@/services/auth.service";

// Хариу болон хэрэглэгчийн мэдээллийн интерфэйсүүд
interface Data {
  uid: number;
  uname: string;
  lname: string;
  fname: string;
  lastlogin: string;
}

interface Response {
  resultCode: number;
  resultMessage: string;
  data: Data[];
  size: number;
  action: string;
  curdate: string;
}

// Формын баталгаажуулалтын схем
const formSchema = z.object({
  email: z.string().email("И-мэйл хаяг буруу байна"),
  password: z.string().min(3, "Нууц үг хамгийн багадаа 3 тэмдэгт байх ёстой"),
  remember: z.boolean().default(false),
});

// Компонент эхэлж байна
const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Хэрэв хэрэглэгч нэвтэрсэн бол шууд /personal руу чиглүүлнэ
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/personal");
    }
  }, [navigate]);

  // Form хяналтын тохиргоо
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });


const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setIsLoading(true);
  setError(null);

  try {
    const userData = await loginUser(values.email, values.password);
    localStorage.setItem("token", JSON.stringify(userData));

    toast({
      title: "Амжилттай нэвтэрлээ",
      description: `Тавтай морил, ${userData.fname} ${userData.lname}!`,
    });

    navigate("/personal");
  } catch (error: any) {
    console.error("Login error:", error);
    setError(
      error.message || "Сүлжээний алдаа гарлаа. Та интернетээ шалгаад дахин оролдоно уу."
    );
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-techhub-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-techhub-blue" />
            <span className="text-2xl font-mono font-bold text-white">TechHub</span>
          </Link>
          <h1 className="mt-6 text-3xl font-mono font-bold text-white">Нэвтрэх</h1>
          <p className="mt-2 text-sm text-gray-400">
            Сурах үйл явцаа үргэлжлүүлээрэй
          </p>
        </div>

        <div className="mt-8 glass-card p-8 rounded-lg">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Имэйл</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-300">
                        Намайг сана
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <Link to="/forgot-password" className="text-sm text-techhub-blue hover:underline">
                  Нууц үг мартсан?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-techhub-blue hover:bg-techhub-blue/80"
                disabled={isLoading}
              >
                {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Бүртгэлгүй юу? </span>
            <Link to="/signup" className="text-techhub-blue hover:underline">
              Бүртгүүлэх
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
