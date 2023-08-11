

export class FavNote {

    constructor(public fId : string | null, public id:string | null,public description:string,public movieId:string,
        public movieTitle:string,public movieYear:string,public movieImageUrl:string
        ,public userId:string | null, public savedById:string | null){}
    }