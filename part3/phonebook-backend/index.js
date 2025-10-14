const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const Person = require("./mongo");

morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Get all persons
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.status(200).send(persons);
    })
    .catch((error) => {
      next(error);
    });
});

// Get a single person
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((error) => {
      next(error);
    });
});

// Delete a person
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => {
      next(error);
    });
});

// Add a new person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })
    .catch((error) => next(error));
});
// Middleware for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
