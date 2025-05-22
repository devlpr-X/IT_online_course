import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";

const mockCourses = [
  {
    title: "React хөгжүүлэлтийг гүнзгийрүүлэн суралцах",
    description: "Орчин үеийн React-ыг hooks, context болон дэвшилтэт загваруудаар эзэмших",
    duration: "12 цаг",
    students: 1234,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    price: 99,
    category: "Frontend",
  },
  {
    title: "Мэдээллийн шинжлэх ухаанд зориулсан Python",
    description: "Өгөгдөл шинжилгээ, машин сургалтын Python програмчлалыг суралцах",
    duration: "15 цаг",
    students: 2156,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
    price: 89,
    category: "Мэдээллийн Шинжлэх Ухаан",
  },
  {
    title: "Бүх талын JavaScript",
    description: "Node.js болон Express ашиглан бүрэн вэб аппликейшн бүтээх",
    duration: "20 цаг",
    students: 1789,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074",
    price: 129,
    category: "Бүтэн Стэк",
  },
];

const FeaturedSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-mono font-bold text-white">Онцлох сургалтууд</h2>
        <Button variant="ghost" className="text-techhub-blue hover:text-techhub-blue/80">
          Бүгдийг харах <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
