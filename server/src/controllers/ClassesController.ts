import { Request, Response } from "express";
import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export const index = async (request: Request, response: Response) => {
  const filters = request.query;

  const week_day = filters.week_day as string;
  const subject = filters.subject as string;
  const time = filters.time as string;

  if (!week_day || !subject || !time) {
    return response.status(400).json({
      error: "Missing filters to seatch classes",
    });
  }

  const timeInMinutes = convertHourToMinutes(time);

  const classes = await db("classes")
    .whereExists(function () {
      this.select("class_schedule.*")
        .from("class_schedule")
        .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
        .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
        .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
        .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
    })
    .where("classes.subject", "=", subject)
    .join("users", "classes.user_id", "=", "users.id")
    .select(["classes.*", "users.*"]);

  return response.json(classes);
};

export const create = async (request: Request, response: Response) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

  const transaction = await db.transaction();

  try {
    const insertedUsersIds = await transaction("users").insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await transaction("classes").insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      };
    });

    await transaction("class_schedule").insert(classSchedule);

    await transaction.commit();

    return response.status(201).send();
  } catch (err) {
    await transaction.rollback();
    return response.status(400).json({
      error: "Unexpected error while creating new class",
    });
  }
};
