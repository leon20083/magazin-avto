import fetch from 'node-fetch';
import { load } from 'cheerio';
import { writeFileSync } from 'fs';

async function parseCarsList(url, file) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка при получении страницы: ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        const $ = load(html);

        const products = [];
        var auto_name = new Object();
        $('#ctl00_BodyPlace_HomeCatalogControl_HomeCatalogPageControl_ManufactAutoDataList').each((index, element) => {
            const auto = $(element).find('.f12').text().trim();
        })
        // Предположим, что каждый автомобиль внутри <div class="car-item">
        $('.acat-model_card').each((index, element) => {
            const el = $(element);
            const name = el.find('.desc-name').text().trim();
            const image = el.find('.image img').attr('src');
            const desc_mod = el.find('.desc-mod').text().trim();;
            

            // Заглушки для price, article, available - подставьте реальные значения по селекторам
            const priceText = el.find('.price').text().trim(); // например, ".price" целевой класс
            const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0; // очистить от лишних символов и преобразовать в число

            const article = el.find('.article').text().trim(); // пример селектора для артикула
            const availableText = el.find('.availability').text().toLowerCase();
            const available = availableText.includes('в наличии') || availableText.includes('available');

            // Добавляем объект в массив
            products.push({
                image,
                name,
                desc_mod,
                price,
                article,
                available
            });
        });
        
        // Записываем в файл
        const output = {
            products: products
        };
        writeFileSync('db2.json', JSON.stringify(output, null, 2));
        console.log(`Обработка завершена. ${products.length} товаров сохранено в db2.json`);
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

var url = 'https://zzap.acat.online/catalogs/CARS_NATIVE/ZAZ'; // замените на реальный URL
var file = 'db2.json'; //файл куда записываем данные
parseCarsList(url, file);
// url = "https://www.zzap.ru/";
// file = "auto_name.json";
// parseCarsList(url, file);