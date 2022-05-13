export interface IProduit {
    id_biere:number;
    nom:string;
    brasserie:string;
    prix:number;
    rabais:boolean;
    description?:string // Non obligatoire
}
