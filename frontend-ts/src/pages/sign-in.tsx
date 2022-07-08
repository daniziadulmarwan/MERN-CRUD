import { useSelector } from "react-redux"

export default function SignIn() {
  const selector:any = useSelector(state => state)

  return (
    <div>
      <h3>Hello {selector.AlertReducer.name}</h3>
    </div>
  )
}