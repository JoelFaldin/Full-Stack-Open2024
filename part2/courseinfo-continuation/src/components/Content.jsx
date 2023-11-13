import Part from './Part'

const Content = (props) => {
    const course = props.course.parts
    return (
        <div>
            {course.map(part => {
                return <Part key={part.id} name={part.name} exer={part.exercises} /> 
            })}

            {/* <Part name={props.course.parts[0].name} exer={props.course.parts[0].exercises} />
            <Part name={props.course.parts[1].name} exer={props.course.parts[1].exercises} />
            <Part name={props.course.parts[2].name} exer={props.course.parts[2].exercises} /> */}
        </div>
    )
}

export default Content;