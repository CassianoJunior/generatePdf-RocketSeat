const express = require("express");
const ejs = require("ejs");
const path = require("path");
// const pdf = require("html-pdf");
const puppeteer = require("puppeteer");
const app = express();

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
];

app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: "A4",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();

  res.contentType("application/pdf");

  return res.send(pdf);
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, data) => {
    if (err) {
      return res.send("Erro na leitura do arquivo");
    }

    // const options = {
    //   height: "11.25in",
    //   width: "8.5in",
    //   header: {
    //     height: "20mm",
    //   },
    //   footer: {
    //     height: "20mm",
    //   },
    // };

    // pdf.create(data, options).toFile("report.pdf", (err, dataPdf) => {
    //   if (err) {
    //     return res.send("Erro ao gerar o PDF");
    //   }

    //   res.send(data);
    // });

    res.send(data);
  });
});

app.listen(3000);
