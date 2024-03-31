export interface FooddiaryModel{
    id:number,
    food:string,
    client: {clientId:number, fullName:string},
    dayOfConsumption: any,
    meal:any,
    quantityInGrams: number
    observations:string
}
