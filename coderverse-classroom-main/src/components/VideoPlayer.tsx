import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: string;
  likes?: number;
  description?: string;
}

interface VideoPlayerProps {
  lesson: Lesson;
}

const VideoPlayer = ({ lesson }: VideoPlayerProps) => {
  // Likes тоог хадгалах state, эхний утга нь lesson.likes эсвэл 0 байна
  const [likes, setLikes] = useState(lesson.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Like товчлуурыг дарахад гүйцэтгэгдэх функц
  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Үнэхээрх видео ирэх хүртэл YouTube iframe тавина */}
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/w7ejDZ8SWv8" 
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          {/* Хичээлийн гарчиг */}
          <h2 className="text-2xl font-mono font-bold text-white">{lesson.title}</h2>
          {/* Like товчлуур */}
          <Button 
            onClick={handleLike} 
            variant="ghost" 
            className={`flex items-center gap-2 ${isLiked ? 'text-techhub-blue' : 'text-gray-400'}`}
          >
            <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-techhub-blue' : ''}`} />
            <span>{likes}</span>
          </Button>
        </div>
        {/* Хичээлийн үргэлжлэх хугацаа */}
        <p className="text-gray-400">Үргэлжлэх хугацаа: {lesson.duration}</p>
      </div>
      
      <div className="pt-4 border-t border-techhub-blue/20">
        <h3 className="text-xl font-mono font-bold text-white mb-4">Хичээлийн тайлбар</h3>
        <p className="text-gray-300">
          {lesson.description || `Энэхүү хичээл нь ${lesson.title}-тэй холбоотой гол ойлголт болон практик хэрэглээний тухай танилцуулна. 
          Заах багшийн алхам алхмаар жишээнүүдийг тайлбарлаж, үндсэн зарчмуудыг ойлгуулна.`}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
