import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, GraduationCap } from "lucide-react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email("Зөв имэйл хаяг оруулна уу"),
});

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Энэ нь жишээ reset, жинхэнэ reset flow-г энд хэрэгжүүлнэ
      console.log("Нууц үг солих хүсэлт:", values.email);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitted(true);

      toast({
        title: "Солих холбоос илгээгдлээ",
        description: "Нууц үг сэргээх холбоосыг имэйлээр шалгаарай",
      });
    } catch (error) {
      toast({
        title: "Хүсэлт амжилтгүй боллоо",
        description: "Солих холбоос илгээхэд алдаа гарлаа",
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
          <h1 className="mt-6 text-3xl font-mono font-bold text-white">Нууц үгээ мартсан</h1>
          <p className="mt-2 text-sm text-gray-400">
            Бид таны имэйл хаягаар нууц үг сэргээх холбоос илгээнэ
          </p>
        </div>

        <div className="mt-8 glass-card p-8 rounded-lg">
          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Имэйл хаяг</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-techhub-blue hover:bg-techhub-blue/80"
                  disabled={isLoading}
                >
                  {isLoading ? "Илгээж байна..." : "Сэргээх холбоос илгээх"}
                </Button>
              </form>
            </Form>
          ) : (
            <Alert className="bg-techhub-blue/10 border-techhub-blue/30">
              <AlertTitle className="text-white">Имэйлээ шалгана уу</AlertTitle>
              <AlertDescription className="text-gray-300">
                Нууц үг сэргээх холбоосыг таны имэйл хаяг руу илгээгдлээ. Шуудангаа шалгаж, зааврыг дагана уу.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-techhub-blue hover:underline">
              <ArrowLeft size={16} />
              <span>Нэвтрэх рүү буцах</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
