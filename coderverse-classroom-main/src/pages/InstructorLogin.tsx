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

// Form schema using zod
const formSchema = z.object({
  email: z.string().email({ message: "Зөв имэйл хаяг оруулна уу." }),
  password: z.string().min(6, { message: "Нууц үг дор хаяж 6 тэмдэгтээс тогтох ёстой." }),
});

const InstructorLogin = () => {
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

    setTimeout(() => {
      setIsLoading(false);

      if (values.email === "instructor@example.com" && values.password === "password") {
        localStorage.setItem("user", JSON.stringify({
          role: "instructor",
          name: "Багш хэрэглэгч",
          email: values.email
        }));

        toast({
          title: "Амжилттай нэвтэрлээ",
          description: "Буцаад тавтай морилно уу, Багш аа!",
        });

        navigate("/instructor/dashboard");
      } else {
        toast({
          title: "Нэвтрэхэд амжилтгүй боллоо",
          description: "Имэйл эсвэл нууц үг буруу байна. Жишээ: instructor@example.com / password",
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
          <h1 className="text-2xl font-mono font-bold text-white mb-6">Багшийн нэвтрэх</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Имэйл хаяг</FormLabel>
                    <FormControl>
                      <Input placeholder="instructor@example.com" {...field} />
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
                  {isLoading ? "Нэвтэрч байна..." : "Багшаар нэвтрэх"}
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Туршилтын нэвтрэх мэдээлэл: instructor@example.com / password
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
