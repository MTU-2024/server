const { pengaduan, Item } = require("../models");
const nodemailer = require("nodemailer");
const multer = require("multer");
// const { transporter } = require("../helpers/nodemailer");
require("dotenv").config()
const SERVERID = process.env.SERVERID
const SERVERPASSWORD = process.env.SERVERPASSWORD
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

// Konfigurasi untuk multer (penyimpanan file)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // folder tempat menyimpan file yang di-upload
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // nama file unik
    },
  });
  
  // Inisialisasi multer
  const upload = multer({ storage: storage });

class PengaduanController {
  static async addPengaduan(req, res, next) {
    try {
      const { name, phoneNumber, context, message } = req.body;
      // console.log(req.body);
      const file = req.file;
      const response = await pengaduan.create({
        name,
        phoneNumber,
        context,
        message,
      });
      //   console.log(response, "sadasdasdsad");
      // console.log(response);
      res.status(201).json({ response });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SERVERID,
          pass: SERVERPASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        // Menambahkan timeout agar menghindari ECONNRESET
        socketTimeout: 5 * 60 * 1000, // 5 menit
        connectionTimeout: 5 * 60 * 1000, // 5 menit
        greetingTimeout: 5 * 60 * 1000, // 5 menit
      });

      const hbsOptions = {
        viewEngine: {
          defaultLayout: false,
        },
        viewPath: "./views",
      };

      transporter.use("compile", hbs(hbsOptions));

      const options = {
        from: SERVERID,
        to: "j.shn50@gmail.com",
        template: "email",
        subject: `Pengaduan After Sales`,
        context: {
          name: name,
          phoneNumber: phoneNumber,
          context: context,
          message: message,
        },
        attachments: file
          ? [
              {
                filename: file.originalname, // Nama file asli
                path: file.path, // Path file yang diupload
              },
            ]
          : [], // Jika tidak ada file, lampiran kosong    
    };

      transporter
        .sendMail(options)
        .then((info) => {
          console.log("Email berhasil dikirim: " + info.response);
        })
        .catch((error) => {
          console.error("Email gagal dikirim:", error);
        });
      return;
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = { PengaduanController, upload };
