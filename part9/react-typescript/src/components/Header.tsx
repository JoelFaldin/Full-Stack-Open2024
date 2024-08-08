interface Header {
  name: string
}

const Header = (props: Header) => {
  return (
    <h1>{props.name}</h1>
  )
}

export default Header