export function calculateDaysDifference(d1:string, d2:string){
    const data1 = new Date(`${d1.substring(3,5)}/${d1.substring(0,2)}/${d1.substring(6,10)}`)
    const data2 = new Date(`${d2.substring(3,5)}/${d2.substring(0,2)}/${d2.substring(6,10)}`)
    return (data1.getTime() - data2.getTime()) / (1000 * 60 * 60 * 24);
}
export function calculateDaysDifferenceDate(d1:Date, d2:Date){
    return (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
}