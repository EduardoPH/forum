import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store'; // Ajuste o caminho conforme necessário
import { addComment, replyToComment } from '@/slices/publicationsSlice'; // Ajuste o caminho conforme necessário
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import type { IComment, IPublication } from '@/slices/publicationsSlice';

interface Comment {
  id: number;
  author: string;
  content: string;
  replies?: Comment[];
  votes: number;
}

const CommentItem = ({
  comment,
  publicationId,
  onReply,
}: {
  comment: Comment;
  publicationId: number;
  onReply: (commentId: number, replyContent: string) => void;
}) => {
  const [votes, setVotes] = useState(comment.votes);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleUpvote = () => setVotes(votes + 1);
  const handleDownvote = () => setVotes(votes > 0 ? votes - 1 : 0);

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <Card className="p-4 mb-4 w-full bg-white shadow-md rounded-lg">
      <div className="flex">
        <div className="flex flex-col items-center justify-center mr-4">
          <Button onClick={handleUpvote} size="sm" className="p-1">
            ↑
          </Button>
          <span className="my-1 text-sm">{votes}</span>
          <Button onClick={handleDownvote} size="sm" className="p-1">
            ↓
          </Button>
        </div>

        <div className="flex-grow">
          <strong className="text-sm text-gray-800">{comment.author}</strong>
          <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
        </div>
      </div>

      <div className="mt-2 text-right">
        <Button size="sm" onClick={() => setIsReplying(!isReplying)}>
          Responder
        </Button>
      </div>

      {isReplying && (
        <div className="mt-2">
          <Textarea
            value={replyContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReplyContent(e.target.value)
            }
            placeholder="Escreva sua resposta..."
            className="w-full text-sm"
          />
          <Button size="sm" onClick={handleReply} className="mt-2">
            Enviar
          </Button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-4">
          {comment.replies.map((reply) => (
            <CommentItem
              comment={reply}
              publicationId={publicationId}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

const CommentSection = ({ publicationId }: { publicationId: number }) => {
  const dispatch = useDispatch();
  const publication = useSelector((state: RootState) =>
    state.publications.publications.find((pub:IPublication) => pub.id === publicationId)
  );

  const handleReply = (commentId: number, replyContent: string) => {
    const reply = {
      id: Date.now(),
      author: 'Você',
      content: replyContent,
      votes: 0,
      replies: [],
    };
    dispatch(replyToComment({ publicationId, commentId, reply }));
  };

  const handleAddComment = (commentContent: string) => {
    const newComment = {
      id: Date.now(),
      author: 'Você',
      content: commentContent,
      votes: 0,
      replies: [],
    };
    dispatch(addComment({ publicationId, comment: newComment }));
  };

  const [newCommentContent, setNewCommentContent] = useState('');

  if (!publication) {
    return <div>Publicação não encontrada.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold">{publication.title}</h2>

      {publication.comments.map((comment:IComment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          publicationId={publicationId}
          onReply={handleReply}
        />
      ))}

      <div className="mt-4">
        <Textarea
          value={newCommentContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewCommentContent(e.target.value)
          }
          placeholder="Escreva um comentario"
          className="w-full text-sm"
        />
        <Button
          size="sm"
          onClick={() => {
            handleAddComment(newCommentContent);
            setNewCommentContent('');
          }}
          className="mt-2"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
