import React from "react";
import { CoursePart } from '../type'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => <div>
    {
        courseParts.map(({ name, exerciseCount }) => (
            <div key={name}>
                {name} {exerciseCount}
            </div>
        ))
    }
</div>
export default Content;