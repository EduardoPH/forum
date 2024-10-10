import { useSelector } from 'react-redux';

import type { IPublication } from '@/slices/publicationsSlice';
import type { RootState } from '@/store';
import { Card } from '../../components/ui/card';

const PublicationsList = () => {
  const publications = useSelector((state: RootState) => state.publications.publications);

  return (
    <div className="mt-4">
      {publications.map((publication:IPublication) => (
        <Card key={publication.id} className="p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <a href={`/publication/${publication.id}`} className="text-lg font-medium text-blue-600">
                {publication.title}
              </a>
              <p className="text-sm text-gray-500">
              comentários: {publication.comments.length} • {publication.author} • {publication.dateCreated.toDateString()}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PublicationsList;
