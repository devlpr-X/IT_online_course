import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    name: z.string().min(2, "Нэр дор хаяж 2 тэмдэгт байх ёстой"),
    email: z.string().email("Зөв имэйл хаяг оруулна уу"),
    password: z.string().min(8, "Нууц үг дор хаяж 8 тэмдэгт байх ёстой"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Та үйлчилгээний нөхцлийг зөвшөөрөх ёстой",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Бүртгүүлэх оролдлого:", values);

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Бүртгэл амжилттай үүслээ",
        description: "TechHub-д тавтай морил!",
      });

      navigate("/personal");
    } catch (error) {
      toast({
        title: "Бүртгэл амжилтгүй боллоо",
        description: "Таны бүртгэл үүсгэх явцад алдаа гарлаа",
        variant: "destructive",
      });
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
          <h1 className="mt-6 text-3xl font-mono font-bold text-white">Бүртгэл үүсгэх</h1>
          <p className="mt-2 text-sm text-gray-400">
            Өнөөдрөөс суралцах аяллаа эхлүүлээрэй
          </p>
        </div>

        <div className="mt-8 glass-card p-8 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Бүтэн нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Дорж Бат" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Имэйл</FormLabel>
                    <FormControl>
                      <Input placeholder="ta@example.com" {...field} />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Нууц үгээ баталгаажуулна уу</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-300">
                        Би{" "}
                        <Link to="/terms" className="text-techhub-blue hover:underline">
                          үйлчилгээний нөхцөл
                        </Link>{" "}
                        болон{" "}
                        <Link to="/privacy" className="text-techhub-blue hover:underline">
                          нууцлалын бодлогыг
                        </Link>{" "}
                        зөвшөөрч байна
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-techhub-blue hover:bg-techhub-blue/80"
                disabled={isLoading}
              >
                {isLoading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Өмнө нь бүртгүүлсэн үү? </span>
            <Link to="/login" className="text-techhub-blue hover:underline">
              Нэвтрэх
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
