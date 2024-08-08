import CoursePart from "../types"
import Part from "./Part"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(item => (
        <Part key={item.name} item={item} />
      ))}
    </>
  )
}

export default Content