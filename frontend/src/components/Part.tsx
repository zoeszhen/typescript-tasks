import React from 'react'
import { CoursePart } from "../index"

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return <div>
                {part.name} {part.exerciseCount} {part.description}
            </div>
        case "Using props to pass data":
            return <div>
                {part.name} {part.exerciseCount} {part.groupProjectCount}
            </div>
        case "Deeper type usage":
            return <div>
                {part.name} {part.exerciseCount} {part.exerciseSubmissionLink} {part.description}
            </div>
        default:
            return assertNever(part)
    }
}

export default Part;