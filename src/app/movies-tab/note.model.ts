import { Movie } from "./movie.model";

export interface Note {
id:string;
description: string;
userId: string;
movieId:string;
movie:Movie;
isFavorite: boolean;
isOnWatchlist: boolean;
}
