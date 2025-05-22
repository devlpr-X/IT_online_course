
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const profileSchema = z.object({
  name: z.string().min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой"),
  bio: z.string().optional(),
  website: z.string().url("Зөв URL хаяг оруулна уу").optional().or(z.literal("")),
});

const securitySchema = z.object({
  currentPassword: z.string().min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"),
  newPassword: z.string().min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Нууц үг таарахгүй байна",
  path: ["confirmPassword"],
});

const PersonalDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const [loading, setLoading] = useState({ profile: false, security: false });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Жон До",
      bio: "React болон TypeScript-д дуртай бүрэн стек хөгжүүлэгч.",
      website: "https://example.com",
    },
  });

  const securityForm = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    setLoading({ ...loading, profile: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Профайл шинэчлэгдлээ",
        description: "Таны профайл амжилттай шинэчлэгдлээ.",
      });
    } catch (error) {
      toast({
        title: "Шинэчлэхэд алдаа гарлаа",
        description: "Профайл шинэчлэх үед асуудал гарлаа.",
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  const onSecuritySubmit = async (values: z.infer<typeof securitySchema>) => {
    setLoading({ ...loading, security: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Нууц үг шинэчлэгдлээ",
        description: "Таны нууц үг амжилттай солигдлоо.",
      });
      securityForm.reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast({
        title: "Шинэчлэхэд алдаа гарлаа",
        description: "Нууц үг шинэчлэх үед асуудал гарлаа.",
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, security: false });
    }
  };

  return (
    <div className="min-h-screen bg-techhub-dark">
      <NavBar />
      <div className="container mx-auto py-8 px-4 pt-[60px]"  >
        <h1 className="text-3xl font-mono font-bold text-white mb-8">Хувийн хуудас</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="profile">Профайл</TabsTrigger>
            <TabsTrigger value="security">Нууцлал</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="glass-card text-white border-techhub-blue/30">
              <CardHeader>
                <CardTitle>Профайлын мэдээлэл</CardTitle>
                <CardDescription className="text-gray-300">
                  Өөрийн профайлын мэдээллийг шинэчлэх
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Бүтэн нэр</FormLabel>
                          <FormControl>
                            <Input placeholder="Жон До" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Танилцуулга</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Өөрийгөө товч танилцуулна уу" className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Вэбсайт</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="bg-techhub-blue hover:bg-techhub-blue/80" disabled={loading.profile}>
                      {loading.profile ? "Хадгалж байна..." : "Хадгалах"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="glass-card text-white border-techhub-blue/30">
              <CardHeader>
                <CardTitle>Нууцлалын тохиргоо</CardTitle>
                <CardDescription className="text-gray-300">
                  Нууц үгээ шинэчлэх
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Одоогийн нууц үг</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Шинэ нууц үг</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Нууц үгээ дахин оруулна уу</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="bg-techhub-blue hover:bg-techhub-blue/80" disabled={loading.security}>
                      {loading.security ? "Шинэчилж байна..." : "Шинэчлэх"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalDashboard;
