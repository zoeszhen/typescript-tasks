interface BMIType {
    message: string
    min: number
    max: number
}
const bmiList: Array<BMIType> = [
    {
        message: "Very severely underweight",
        min: 0,
        max: 15
    },
    {
        message: "Severely underweight",
        min: 15,
        max: 16
    },
    {
        message: "Underweight",
        min: 16,
        max: 18.5
    },
    {
        message: "Normal (healthy weight)",
        min: 18.5,
        max: 25
    },
    {
        message: "Overweight",
        min: 25,
        max: 30
    },
    {
        message: "Obese Class I (Moderately obese)",
        min: 30,
        max: 35
    },
    {
        message: "Obese Class II (Severely obese)",
        min: 35,
        max: 40
    },
    {
        message: "Obese Class II (Severely obese)",
        min: 40,
        max: 100
    }
];

/**
 * BMI
 */
export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight/(height*height/10000);
    const res = bmiList.filter((bmiRef)=> bmiRef.min<bmi && bmiRef.max> bmi);
    if(res.length > 0){
        return res[0].message;
    }else{
        return "malformatted parameters";
    }
};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));