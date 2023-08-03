import { Movie } from "./movie.model";

export class Note {

constructor(public id:string | null,public description:string,public movieId:string,
    public movieTitle:string,public movieYear:string,public movieImageUrl:string
    ,public userId:string | null){}
}
