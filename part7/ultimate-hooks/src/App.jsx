import { useField, useResource } from "./hooks/hooks"

const App = () => {
  const content = useField("text")
  const name = useField("text")
  const number = useField("text")

  const [notes, noteService] = useResource("http://localhost:3005/notes")
  const [persons, personService] = useResource("http://localhost:3005/persons")

  const handleNoteSubmit = (e) => {
    e.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }

  const handlePersonSubmit = (e) => {
    e.preventDefault()
    personService.create({
      name: name.value,
      number: number.value
    })
    name.reset()
    number.reset()
  }

  const { reset: resetContent, ...contentInput } = content
  const { reset: resetName, ...nameInput } = name
  const { reset: resetNumber, ...numberInput } = number

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentInput} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameInput} /> <br />
        number <input {...numberInput} />
        <button>create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App
