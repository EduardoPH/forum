import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IComment {
  id: number;
  author: string;
  content: string;
  replies?: IComment[];
  votes: number;
}

export interface IPublication {
  id: number;
  title: string;
  comments: IComment[];
  author: string;
  dateCreated: Date;
}

interface PublicationsState {
  publications: IPublication[];
}

const initialState: PublicationsState = {
  publications: [
    {
      id: 1,
      author: "Eduardo Mendes",
      title: 'Primeira Publicação',
      dateCreated: new Date(),
      comments: [
        {
          id: 1,
          author: 'devtavares',
          content: 'Muito legal! Eu faria um template de apresentação...',
          votes: 10,
          replies: [],
        },
      ],
    },
  ],
};

const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ publicationId: number; comment: IComment }>
    ) => {
      const publication = state.publications.find(
        (pub) => pub.id === action.payload.publicationId
      );
      if (publication) {
        publication.comments.push(action.payload.comment);
      }
    },
    replyToComment: (
      state,
      action: PayloadAction<{
        publicationId: number;
        commentId: number;
        reply: IComment;
      }>
    ) => {
      const publication = state.publications.find(
        (pub) => pub.id === action.payload.publicationId
      );
      if (publication) {
        const comment = publication.comments.find(
          (com) => com.id === action.payload.commentId
        );
        if (comment) {
          comment.replies?.push(action.payload.reply);
        }
      }
    },
  },
});

export const { addComment, replyToComment } = publicationsSlice.actions;
export default publicationsSlice.reducer;
