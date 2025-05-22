import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Арын өнгөний градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-techhub-dark via-techhub-dark/90 to-techhub-dark z-0" />
      {/* Арын зураг бага тунгалагтай */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074')] bg-cover bg-center opacity-10 z-[-1]" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-fade-up space-y-6 max-w-3xl mx-auto">
          {/* Хуудасны эхний тэмдэглэл */}
          <Badge className="bg-techhub-blue/20 text-techhub-blue border-techhub-blue/30 backdrop-blur-sm">
            TechHub-д тавтай морилно уу
          </Badge>

          {/* Гарчиг */}
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-white leading-tight">
            Орчин үеийн технологийг мэргэжлийн сургалтаар эзэмшээрэй
          </h1>

          {/* Тайлбар текст */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Программчлал, өгөгдлийн шинжлэх ухаан болон бусад олон сэдвээр чанартай видео курс авах боломжтой. Салбарын мэргэжилтнүүдээс суралцаж, технологийн карьераа ахиулна уу.
          </p>

          {/* Товчлуурууд */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-techhub-blue hover:bg-techhub-blue/80" asChild>
              <Link to="/courses">
                Курсуудыг үзэх <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="border-techhub-blue text-techhub-blue hover:bg-techhub-blue/10">
              Илүү ихийг мэдэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
