type BMIType = {
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
]

/**
 * BMI
 */
const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight/(height*height/10000)
   return bmiList.filter((bmiRef)=> bmiRef.min<bmi && bmiRef.max> bmi)[0].message
}

console.log(calculateBmi(180, 74))