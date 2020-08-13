const db = require('./db');
const createProffy = require('./createProffy');

db.then(async db => {
  proffyData = {
    name: 'Vinicius Mazon',
    avatar: 'https://avatars3.githubusercontent.com/u/38103866?s=460&u=244951efa29035b28d90d168c50cd497cde3b9d5&v=4',
    whatsapp: '1199999999',
    bio: 'Melhor professor de inglês do mundo!!!'
  };

  classData = {
    subject: "Inglês",
    cost: '80'
  };

  classScheduleData = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220
    }
  ];

  // await createProffy(db, { proffyData, classData, classScheduleData });


});



