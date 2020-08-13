const Database = require('./database/db');
const {
  getSubject,
  convertHoursToMinutes,
  subjects,
  weekdays
} = require('./utils/format');

function pageLanding(req, res) {
  return res.render("index.html");
}

async function pageStudy(req, res) {
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", {
      filters,
      subjects,
      weekdays
    });
  }

  const timeToMinutes = convertHoursToMinutes(filters.time);

  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = classes.id
      AND class_schedule.weekday = ${filters.weekday}
      AND class_schedule.time_from <= ${timeToMinutes}
      AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = ${filters.subject};
  `;

  try {
    const db = await Database;
    const proffys = await db.all(query);
    proffys.map(proffy => {
      proffy.subject = getSubject(proffy.subject);
    });
    return res.render("study.html", { proffys, subjects, filters, weekdays });
  } catch (err) {
    console.log(err);
  }
}

function pageGiveClasses(req, res) {
  return res.render("give-classes.html", {
    subjects,
    weekdays
  });
}

async function saveClasses(req, res) {
  const createProffy = require('./database/createProffy');
  const data = req.body;

  const proffyData = {
    name: data.name,
    avatar: data.avatar,
    whatsapp: data.whatsapp,
    bio: data.bio
  };

  const classData = {
    subject: data.subject,
    cost: data.cost
  };

  const classScheduleData = data.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinutes(data.time_from[index]),
      time_to: convertHoursToMinutes(data.time_to[index])
    }
  });

  try {
    const db = await Database;
    await createProffy(db, { proffyData, classData, classScheduleData });

    let queryString = "?subject=" + data.subject;
    queryString += "&weekday=" + data.weekday[0];
    queryString += "&time=" + data.time_from[0];

    return res.redirect("/study" + queryString);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
}
