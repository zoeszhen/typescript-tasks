interface ExecriseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}
interface HoursData{
    targetHours: number,
    hours: Array<number>
}

const ratingDescription: Array<string> = ['keep it up', 'not too bad but could be better', 'good job']

const execriseCalculator = ( { hours, targetHours } : HoursData): ExecriseResult=>{
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

const parseArguments = (args: Array<string>): HoursData => {
    return {
        targetHours:Number(args[2]),
        hours: args.slice(3, args.length).map((hour)=>Number(hour))
    }
}

console.log(execriseCalculator(parseArguments(process.argv)))