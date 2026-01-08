const axios = require("axios"); // Импортируем Axios
const cheerio = require("cheerio"); // Импортируем Cheerio (пример парсера HTML)
const { log } = require("console");
const fs = require("fs");

async function scrapeData() {
  try {
    const response = await axios.get(
      "https://zzap.acat.online/catalogs/CARS_NATIVE/VAZ"
    ); // 1. Получаем HTML
    const html = response.data; // Содержимое страницы
    const $ = cheerio.load(html); // 2. Загружаем HTML в Cheerio
    // console.log(response.data)
    // 3. Извлекаем заголовки книг
    $(".acat-model_card .image>img").each((i, element) => {
      let arr = $(element).attr("src");
      let jsonData = JSON.stringify(arr);
      // // создаём файл
      // fs.writeFileSync("data.json", JSON.stringify(jsonData));

      // // берём старые данные
      // const dbData = JSON.parse(
      //   fs.readFileSync("data.json", (err, jsonData) => jsonData)
      // );
      // // сливает данные
      // fs.writeFileSync("data.json", JSON.stringify([...dbData, ...jsonData]));
      // // читаем файл
      // const text = fs.readFileSync("data.json", "utf8");
      // console.log(JSON.parse(text));
      let arr2 = jsonData.replace(/"/g, "");
      let str = i + "," + arr2;
      let str2 = str.split(",");
      // let str3 = JSON.stringify(str2);
      // console.log(JSON.stringify(arr2.split(',')));
      const jsonString = JSON.stringify(str2);
      // fs.writeFile("data.json", jsonString);
      // console.log(jsonString);
      // fs.writeFile('data.json', jsonString, (err) => {
      //   if (err) {
      //     console.error('Error writing file:', err);
      //     return;
      //   }
      //     console.log('File has been written successfully!');
      //   });
      fs.appendFile(
        "db.json",
        jsonString+',',
        "utf8",
        (err) => {
          if (err) throw err;
          console.log("Данные добавлены!");
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
}

scrapeData();
