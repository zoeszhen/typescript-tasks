export interface ExecriseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}
export interface HoursData{
    target: number,
    daily_exercises: Array<number>
}

const ratingDescription: Array<string> = ['keep it up', 'not too bad but could be better', 'good job'];

export const execriseCalculator = ( { daily_exercises, target } : HoursData): ExecriseResult=>{
    const averageHours: number = daily_exercises.reduce((a, b) => a + b, 0)/daily_exercises.length;
    const rating : number = averageHours/target >= 1 ? 3 : averageHours/target >= 0.5 ? 2 : 1;
    return {
        periodLength: daily_exercises.length,
        trainingDays: daily_exercises.filter((hour)=> hour !== 0).length,
        success: averageHours >= target,
        rating: rating,
        ratingDescription: ratingDescription[rating - 1] ,
        target: target,
        average: averageHours 
    };
};

// const parseArguments = (args: Array<string>): HoursData => {
//     return {
//         target: Number(args[2]),
//         daily_exercises: args.slice(3, args.length).map((hour)=>Number(hour))
//     };
// };

// console.log(execriseCalculator(parseArguments(process.argv)));