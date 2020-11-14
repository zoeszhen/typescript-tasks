import React from "react";
import { CoursePart } from '../type'
const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => <p>
    Number of exercises{" "}
    {courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
</p>
export default Total;