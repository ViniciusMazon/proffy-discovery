const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const proffys = [
  {
    name: "Vinicius Mazon",
    avatar: "https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4",
    whatsapp: "7799999999",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "100",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Vinicius Patricio",
    avatar: "https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4",
    whatsapp: "1199999999",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "100",
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  }
];

function pageLanding(req, res) {
  return res.render("index.html");
}

function pageStudy(req, res) {
  const filters = req.query;
  return res.render("study.html", {
    proffys,
    filters,
    subjects,
    weekdays
  });
}

function pageGiveClasses(req, res) {
  const data = req.query;
  const isNotEmpty = Object.keys(data).length > 0;
  if (isNotEmpty) {

    data.subject = getSubject(data.subject);

    proffys.push(data);
    return res.redirect('/study');
  }

  return res.render("give-classes.html", {
    subjects,
    weekdays
  });
}

function getSubject(subjectNumber) {
  const arrayPosition = +subjectNumber - 1;
  return subjects[arrayPosition];
}


server.use(express.static("public"));

server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);

server.listen(3333, () => console.log("⚡️  Server running on port 3333"));
