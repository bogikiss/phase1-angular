export interface FooddiaryModel{
    id:number,
    food: {foodId:number,nameOfFood:string},
    client: {clientId:number, fullName:string},
    quantityInGrams: number

}
