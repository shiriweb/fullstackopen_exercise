import { useState, useEffect } from 'react'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const showNotification = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 5000)
  }

  const handleAddPerson = (e) => {
    e.preventDefault()
    
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added. Replace the old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            showNotification(`Updated ${newName}'s number`, 'success')
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showNotification(`Information of ${newName} has already been removed`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${newName}`, 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          showNotification('Error adding person', 'error')
        })
    }
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          showNotification(`Information of ${name} has already been removed`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleFilterChange = (e) => setFilter(e.target.value)
  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

      <div>
        Filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>

      <form onSubmit={handleAddPerson}>
        <div>
          Name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => handleDeletePerson(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
