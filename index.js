// To get express Server
const server = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./helper');
const members = require('./members');

const app = server();
const port = 3000;

//Middlewares express js
app.use(morgan('dev')).use(bodyParser.json());

// TO Get endpoints
app.get('/', (req, res) => {
  res.send(
    '<h1 style="color: red">Hello to our "api" running on server express.js!</h1>'
  );
});

//CRUD APP EXPRESS

//READ

app.get('/members/', (req, res) => {
  const id = parseInt(req.params.id);
  members.find(member => member.id === id);
  const message = 'No problem is detected in this list.';
  res.json(success(message, members));
});

app.get('/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const member = members.find(member => member.id === id);
  res.send(
    `<h1>La liste des personnes contient le membre :  ${member.firstName}</h1>`
  );
});

//CREATE
const newMembers = { ...members };

app.post('/app/members/:id', (req, res) => {
  const id = getUniqueId(members);
  const createdMember = { ...req.body, ...{ id: id, created: new Date() } };
  members.push(createdMember);
  const message = `Le membre ${createdMember.firstName} été rajouté à la liste`;
  res.send(success(message, createdMember));
});

//update

app.put('/app/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMember = { ...req.body, id: id };
  members.map(member => {
    member.id === id ? updatedMember : member;
  });
  const message = `L'ancien membre ${updatedMember.firstName} est remplasé`;
  res.send(success(message, updatedMember));
});

//DELETE

app.delete('/app/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedMember = members.find(member => member.id === id);
  members.filter(member => member.id !== id);
  const message = `Le membre ${deletedMember.firstName} est supprimé!`;
  res.send(success(message, deletedMember));
});

// Listen server
app.listen(port, () => {
  console.log(`This app is running on http://localhost:${port}`);
});
