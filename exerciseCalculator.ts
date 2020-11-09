interface ExecriseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

const ratingDescription: Array<string> = ['keep it up', 'not too bad but could be better', 'good job']

const execriseCalculator = ( hours:Array<number>, targetHours : number): ExecriseResult=>{
    const averageHours: number = hours.reduce((a, b) => a + b, 0)/hours.length
    const rating : number = averageHours/targetHours >= 1 ? 3 : averageHours/targetHours >= 0.5 ? 2 : 1
    return {
        periodLength: hours.length,
        trainingDays: hours.filter((hour)=> hour !== 0).length,
        success: averageHours >= targetHours,
        rating: rating,
        ratingDescription: ratingDescription[rating - 1] ,
        target: targetHours,
        average: averageHours 
    }
}
execriseCalculator([3, 0, 2, 4.5, 0, 3, 1],2)