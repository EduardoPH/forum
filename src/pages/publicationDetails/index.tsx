// PublicationDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CommentSection from '@/components/commentSection';
import { Card } from '@/components/ui/card';

const PublicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const publication = useSelector((state: RootState) =>
    state.publications.publications.find((pub) => pub.id === parseInt(id || '0'))
  );

  if (!publication) {
    return <div>Publicação não encontrada</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-4 mb-4">
        <h1>{publication.title}</h1>
        <div className="mt-4">
          {publication.comments.map((comment) => (
            <p key={comment.id}>{comment.content}</p>
          ))}
        </div>
      </Card>

      <CommentSection publicationId={publication.id} />
    </div>
  );
};

export default PublicationDetails;
