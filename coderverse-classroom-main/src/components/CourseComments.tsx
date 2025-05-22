import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Star, Send } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  date: string;
  content: string;
  rating: number;
}

interface CourseCommentsProps {
  comments: Comment[];
}

const CourseComments = ({ comments }: CourseCommentsProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Жинхэнэ апп-д API руу илгээдэг байх ёстой
    console.log("Сэтгэгдэл илгээж байна:", newComment);
    setNewComment("");
  };

  return (
    <div className="space-y-8">
      {/* Сэтгэгдэл нэмэх хэсэг */}
      <div className="bg-white/5 backdrop-blur-sm border border-techhub-blue/20 rounded-lg p-6">
        <h3 className="text-xl font-mono font-bold text-white mb-4">Сэтгэгдэл нэмэх</h3>
        <form onSubmit={handleSubmitComment}>
          <Textarea
            placeholder="Энэхүү сургалтын талаар бодол, сэтгэгдлээ хуваалцаарай..."
            className="bg-techhub-dark border-techhub-blue/30 mb-4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" className="bg-techhub-blue hover:bg-techhub-blue/80">
            <Send className="h-4 w-4 mr-2" />
            Сэтгэгдэл илгээх
          </Button>
        </form>
      </div>

      {/* Сэтгэгдлүүдийн жагсаалт */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white/5 backdrop-blur-sm border border-techhub-blue/20 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.user} />
                <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white">{comment.user}</h4>
                  <span className="text-sm text-gray-400">{comment.date}</span>
                </div>
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < comment.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseComments;
