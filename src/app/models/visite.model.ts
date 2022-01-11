
export class Visite {

  constructor(
    public id_visite : number = 0,
    public date_visite : Date,
    public docteur : string,
    public type_visite : string,
    public diagnostic : string,
    public id_dm : number

    ){}


}
