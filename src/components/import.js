// console.log('Привет')
import puppeteer from 'puppeteer';
// const { log } = require('console');
// const puppeteer = require('puppeteer');

const api = (async () => {
    const brouser = await puppeteer.launch({headless: false});
    const page = await brouser.newPage(); 
    await page.goto('https://zzap.acat.online/catalogs/CARS_NATIVE/VAZ');// открываем нужную страницу в браузере
    await page.screenshot({path: 'img.png'}); // Делаем скриншот 

    let arr = await page.evaluate(() => {
        let text = Array.from(document.querySelectorAll('.acat-model .acat-model_card .desc'), el => el.innerText) ;// делаем выборку по указаным элементам
        return text;
    })
    console.log(arr); // выводим в консоль


    await brouser.close(); // закрываем браузер
})()

export default api;