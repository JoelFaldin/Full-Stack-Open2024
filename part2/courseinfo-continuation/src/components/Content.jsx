import Part from './Part'
import Total from './Total'

const Content = (props) => {
    const course = props.course.parts
    return (
        <div>
            {course.map(part => {
                return <Part key={part.id} name={part.name} exer={part.exercises} /> 
            })}

            <Total exercises={props.course.parts} />
        </div>
    )
}

export default Content;