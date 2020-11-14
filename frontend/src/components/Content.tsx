import React from "react";
import { CoursePart } from '../index'
import Part from './Part'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => <div>
    {
        courseParts.map((part) => (
            <Part key={part.name} part={part}></Part>
        ))
    }
</div>
export default Content;