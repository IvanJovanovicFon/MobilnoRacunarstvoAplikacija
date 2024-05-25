export class User {
  constructor(
    public id:string | null, 
    public email: string, 
    public name: string,
    public lastname: string,
    private _token: string,
    private _tokenExpirationDate: Date){}

    get token(){
        if(!this._tokenExpirationDate || this._tokenExpirationDate<= new Date()){
            return null;
        }
        return this._token;
    }

}