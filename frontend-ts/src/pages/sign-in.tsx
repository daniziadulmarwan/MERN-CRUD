import React, {useState, useEffect} from 'react'

type Data = {
  name: string,
  age: number,
}

export default function SignIn(props:Data) {
  const [name, setName] = useState(props.name)

  useEffect(() => {
    setTimeout(() => {
      setName('Marwan');
    }, 3000);
  }, []);

  return (
    <div>
      <p>{`My name is ${props.name}, i am ${props.age} year old`}</p>
      <p>{name}</p>
    </div>
  )
}