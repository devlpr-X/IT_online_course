import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id?: number;
  title: string;        // Хичээлийн нэр
  description: string;  // Хичээлийн товч танилцуулга
  duration: string;     // Хичээлийн үргэлжлэх хугацаа
  students: number;     // Оролцогч оюутнуудын тоо
  image: string;        // Зурагны URL
  price: number;        // Үнийн дүн
  category: string;     // Ангилал, төрөл
  isOwned?: boolean;    // Хэрэглэгчийн эзэмшиж байгаа эсэх
  isLiked?: boolean;    // Хэрэглэгчийн дуртай эсэх
}

const CourseCard = ({
  id = 1, // Хэрвээ id өгөгдөөгүй бол анхны утга
  title,
  description,
  duration,
  students,
  image,
  price,
  category,
  isOwned,
  isLiked,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white/5 backdrop-blur-sm border-techhub-blue/20">
      <Link to={`/course/${id}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full" />
          <Badge className="absolute top-2 right-2 bg-techhub-blue">{category}</Badge>

          {isLiked && (
            <div className="absolute top-2 left-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            </div>
          )}

          {isOwned && (
            <Badge className="absolute bottom-2 left-2 bg-emerald-600">
              Бүртгэлтэй
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-4 space-y-4">
        <Link to={`/course/${id}`} className="block">
          <h3 className="text-xl font-bold font-mono text-white">{title}</h3>
          <p className="text-gray-400 line-clamp-2">{description}</p>
        </Link>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{students} оюутан</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-techhub-blue">{price},000₮</span>
          <Link to={`/course/${id}`}>
            <Button className="bg-techhub-blue hover:bg-techhub-blue/80">
              {isOwned ? "Үргэлжлүүлэх" : "Бүртгүүлэх"}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
