module.exports = async function (db, { proffyData, classData, classScheduleData }) {
  const { lastID: proffy_id } = await db.run(`
    INSERT INTO proffys (
      name,
      avatar,
      whatsapp,
      bio
    ) VALUES (
      "${proffyData.name}",
      "${proffyData.avatar}",
      "${proffyData.whatsapp}",
      "${proffyData.bio}"
    );
  `);

  const { lastID: class_id } = await db.run(`
      INSERT INTO classes (
        subject,
        cost,
        proffy_id
      ) VALUES (
        "${classData.subject}",
        "${classData.cost}",
         ${proffy_id}
      );
  `);

  const insertedAllClasseScheduleData = classScheduleData.map(schedule => {
    return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      ) VALUES (
        ${class_id},
        ${schedule.weekday},
        ${schedule.time_from},
        ${schedule.time_to}
      );
    `);
  });

  await Promise.all(insertedAllClasseScheduleData);
}

