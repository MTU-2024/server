const { Reminder } = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config()
const SERVERID = process.env.SERVERID
const SERVERPASSWORD = process.env.SERVERPASSWORD

class ReminderController {
  static async sendEmailReminder(reminder) {
    const { emailTo, expiredDate, name, dateReminder, type } = reminder;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SERVERID,
        pass: SERVERPASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Tambahkan ini untuk menonaktifkan verifikasi sertifikat
      },
    });

    const [day, month, year] = expiredDate.split("/"); // Memisahkan string berdasarkan "/"
    const expired = new Date(`${year}-${month}-${day}`); // Buat Date object dari format yyyy-mm-dd

    let reminderDate = new Date(expired);

    // Cek format dateReminder (bisa string seperti "2 weeks" atau tanggal)
    if (typeof dateReminder === "string") {
      if (dateReminder.includes("weeks")) {
        // Jika dateReminder dalam bentuk string seperti "2 weeks"
        const weeks = parseInt(dateReminder.split(" ")[0], 10);
        reminderDate.setDate(expired.getDate() - weeks * 7); // Konversi minggu ke hari
        // console.log(reminderDate)
      } else {
        // Jika dateReminder dalam format tanggal seperti "dd/mm/yyyy"
        const [reminderDay, reminderMonth, reminderYear] =
          dateReminder.split("/");
        reminderDate = new Date(
          `${reminderYear}-${reminderMonth}-${reminderDay}`
        );
        // console.log(reminderDate)
      }
    } else {
      // Jika dateReminder adalah angka (jumlah hari)
      reminderDate.setDate(expired.getDate() - dateReminder);
    //   console.log(reminderDate)
    }

    const now = new Date();

    if (now >= reminderDate && now < expired) {
      let mailOptions = {
        from: SERVERID,
        to: emailTo,
        subject: `Reminder: Produk ${name} akan kadaluarsa`,
        text: `Produk ${name} akan kadaluarsa pada ${expiredDate}. Silakan perbarui sesuai kebutuhan.`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email reminder sent successfully!");
        if (type === "routine") {
            expired.setMonth(expired.getMonth() + 1); // Tambah 1 bulan
  
            // Buat expiredDate dengan format dd-mm-yyyy
            const updatedDay = String(expired.getDate()).padStart(2, '0');
            const updatedMonth = String(expired.getMonth() + 1).padStart(2, '0'); // Month index dimulai dari 0
            const updatedYear = expired.getFullYear();
  
            const updatedExpiredDate = `${updatedDay}/${updatedMonth}/${updatedYear}`;
  
            // Update expiredDate di database dengan format dd-mm-yyyy
            await Reminder.update(
              { expiredDate: updatedExpiredDate },
              { where: { id: reminder.id } }
            );
            console.log(`Expired date diperbarui menjadi ${updatedExpiredDate}`);
          }
      } catch (error) {
        console.error("Failed to send email reminder:", error);
      }
    }
  }

  static async addReminder(req, res, next) {
    try {
      const {
        name,
        type,
        brand,
        lessValue,
        purchaseDate,
        expiredDate,
        emailTo,
        dateReminder,
        note,
      } = req.body;
      const reminder = await Reminder.create({
        name,
        type,
        brand,
        lessValue,
        purchaseDate,
        expiredDate,
        emailTo,
        dateReminder,
        note,
      });
      await ReminderController.sendEmailReminder(reminder);
      res.status(201).json({ message: `${reminder.name} has been created` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getReminder(req, res, next) {
    try {
      const allReminder = await Reminder.findAll();
      res.status(200).json(allReminder);
    } catch (err) {
      next(err);
    }
  }

  static async editReminder(req, res, next) {
    try {
      const { id } = req.params;
      let reminder = await Reminder.findByPk(id);
      if (!reminder) {
        throw {
          code: 400,
          name: "Bad Request",
          message: `reminder id ${req.params.id} not found`,
        };
      } else {
        let {
          name,
          type,
          brand,
          lessValue,
          purchaseDate,
          expiredDate,
          emailTo,
          dateReminder,
          note,
        } = req.body;
        let update = await Reminder.update(
          {
            name,
            type,
            brand,
            lessValue,
            purchaseDate,
            expiredDate,
            emailTo,
            dateReminder,
            note,
          },
          {
            where: {
              id,
            },
          }
        );
        const updatedReminder = await Reminder.findByPk(id);
        await ReminderController.sendEmailReminder(updatedReminder);
        res.status(200).json(update);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteReminder(req, res, next) {
    try {
      const { id } = req.params;
      Reminder.destroy({ where: { id } });
      res.status(200).json({ message: "Reminder delete success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ReminderController;
