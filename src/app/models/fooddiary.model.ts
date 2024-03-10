export interface FooddiaryModel{
    id:number,
    food:string,
    client: {clientId:number, fullName:string},
    dayOfConsumption: Date,
    meal:any,
    quantityInGrams: number
    observations:string
}
