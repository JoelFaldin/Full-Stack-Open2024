import CoursePart from "../types"

interface PartProps {
  item: CoursePart
}

const Part = (props: PartProps) => {
  const { item } = props

  const assertNever = (arg: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(arg)}`)
  }

  switch(item.kind) {
    case 'basic':
      return <p>
        <strong>{item.name} {item.exerciseCount}</strong>
        <br />
        <i>{item.description}</i>
      </p>
    case 'group':
      return <p>
        <strong>{item.name} {item.exerciseCount}</strong>
        <br />
        <i>Project exercises: {item.groupProjectCount}</i>
      </p>
    case 'background':
      return <p>
        <strong>{item.name} {item.exerciseCount}</strong>
        <br />
        <i>{item.description}</i>
        <br />
        <span>submit to: <i>{item.backgroundMaterial}</i></span>
      </p>
    case 'special':
      return <p>
        <strong>{item.name} {item.exerciseCount}</strong>
        <br />
        <i>{item.description}</i>
        <br />
        <span>Required Skills: </span>
          {item.requirements.map((req, index) => (
            <span key={req}>
              {req}
              {index < item.requirements.length - 1 ? ', ' : ''}
            </span>
          ))} 
      </p>
    default:
      assertNever(item)
  }
}

export default Part