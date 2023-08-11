export interface NoteExplore {
    id: string | null; 
    description: string;
    movieId: string;
    movieTitle: string;
    movieYear: string;
    movieImageUrl: string;
    userId: string | null;
    isNoteCreatedByCurrentUser: boolean;
    isFavorite: boolean;
}