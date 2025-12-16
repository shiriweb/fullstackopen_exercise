const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/person');

const args = process.argv.slice(2); 

const password = args[0];

if (!password) {
  console.log('Please provide your MongoDB password as the first argument');
  process.exit(1);
}

const url = `mongodb+srv://shirisha:${password}@cluster0.d5g4fg8.mongodb.net/phonebook?retryWrites=true&w=majority
`

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');

    if (args.length === 1) {
      Person.find({})
        .then(persons => {
          console.log('phonebook:');
          persons.forEach(p => {
            console.log(`${p.name} ${p.number}`);
          });
          mongoose.connection.close();
        })
        .catch(err => console.log(err));
    } else if (args.length === 3) {
      const name = args[1];
      const number = args[2];

      const person = new Person({ name, number });
      person.save()
        .then(savedPerson => {
          console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`);
          mongoose.connection.close();
        })
        .catch(err => console.log(err));
    } else {
      console.log('Usage: node mongo.js <password> [name number]');
      mongoose.connection.close();
    }
  })
  .catch(err => console.log('Connection error:', err));
