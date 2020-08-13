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
    subject: 1,
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

  const selectedProffys = await db.all("SELECT * FROM proffys");

  const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys JOIN classes
    ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `);

  const selectedClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = 0
    AND class_schedule.time_from <= 530
    AND class_schedule.time_to > 1120;
  `);
});



