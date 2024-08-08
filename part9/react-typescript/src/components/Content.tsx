interface Content {
  data: {
    name: string,
    exerciseCount: number
  }[]
}

const Content = (props: Content) => {
  return (
    <>
      {props.data.map(item => (
        <p key={item.name}>{item.name} {item.exerciseCount}</p>
      ))}
    </>
  )
}

export default Content