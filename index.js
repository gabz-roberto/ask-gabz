const express = require("express");
const ejs = require("ejs");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

const app = express();

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão realizada");
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

// Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] })
    .then((questions) => {
      res.render("index.ejs", {
        questions: questions,
      });
    });
});

app.get("/ask", (req, res) => {
  res.render("ask.ejs");
});

app.post("/savequestion", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/question/:id", (req, res) => {
  let id = req.params.id;
  Question.findOne({
    where: { id: id },
  }).then((question) => {
    if (question != undefined) {
      Answer.findAll({
        where: { questionId: question.id },
        order: [['id', 'DESC']],
      }).then((resp) => {
        res.render("question.ejs", {
          question: question,
          answers: resp, 
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/respond", (req, res) => {
  const body = req.body.body;
  const questionId = req.body.questionId;
  Answer.create({
    body: body,
    questionId: questionId,
  }).then(() => {
    res.redirect(`/question/` + questionId);
  });
});

// Server
const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.log("ERROR");
  } else {
    console.log(`Servidor rodando na porta: ${PORT}`);
  }
});
