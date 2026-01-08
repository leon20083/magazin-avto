<template>
  <div>
    <!-- Кнопка для запуска процесса парсинга страницы -->
    <button @click="fetchAndParse">Парсить страницу</button>
    
    <!-- Отображение индикатора загрузки -->
    <div v-if="loading">Загрузка...</div>
    
    <!-- Отображение ошибки, если произошла -->
    <div v-if="error" style="color:red">{{ error }}</div>
    
    <!-- Список полученных продуктов -->
    <ul>
      <li v-for="(product, index) in products" :key="index">
        <!-- Показываем изображение продукта -->
        <img :src="product.image" alt="" width="50" />
        <!-- Название продукта -->
        <strong>{{ product.name }}</strong> - {{ product.price }} руб.
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "vImport",
  setup() {
    // Реактивный массив для хранения полученных продуктов
    const products = ref([]);
    // Индикатор загрузки
    const loading = ref(false);
    // Строка для ошибок
    const error = ref('');

    /**
     * Эта функция отправляет запрос на страницу, получает HTML,
     * парсит его и извлекает нужные данные.
     */
    const fetchAndParse = async () => {
      // Указываем, что началась загрузка
      loading.value = true;
      
      // Сброс ошибок
      error.value = '';

      try {
        // Выполняем fetch-запрос на указанный URL
        const response = await fetch('https://пример.сайт/страница_списка_авто');
        // Получаем текстовую версию HTML документа
        const htmlText = await response.text();

        // Создаём DOMParser — встроенный в браузер инструмент для парсинга HTML
        const parser = new DOMParser();
        // Парсим HTML строку в Document
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Создаем пустой массив для новых данных
        const newProducts = [];

        // Находим все блоки с автомобилями
        // Перед этим нужно изучить структуру страницы и выбрать правильный CSS-селектор
        const items = doc.querySelectorAll('div.car-item');

        // Перебираем каждый блок автомобиля
        items.forEach(item => {
          // Извлекаем название автомобиля
          const name = item.querySelector('h2.car-title')?.textContent.trim() || '';
          
          // Извлекаем URL изображения
          const image = item.querySelector('img')?.getAttribute('src') || '';

          // Пример извлечения цены:
          // Предположим, есть элемент с классом .price
          const priceText = item.querySelector('.price')?.textContent.trim() || '0';
          
          // Удаляем всё, кроме цифр и точек, и преобразуем в число
          const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;

          // Извлекаем артикул
          const article = item.querySelector('.article')?.textContent.trim() || '';

          // Проверка доступности
          const availableText = item.querySelector('.availability')?.textContent.trim().toLowerCase() || '';
          
          // Возможные варианты проверки наличия
          const available = availableText.includes('в наличии') || availableText.includes('available');

          // Добавляем собранные данные в массив
          newProducts.push({ image, name, price, article, available });
        });

        // Обновляем реактивный массив продуктов
        products.value = newProducts;

      } catch (err) {
        // В случае ошибки, выводим сообщение
        error.value = 'Ошибка при парсинге: ' + err.message;
      } finally {
        // В конце убираем индикатор загрузки
        loading.value = false;
      }
    };

    // Возвращаем переменные и функцию для использования в шаблоне
    return {
      products,
      fetchAndParse,
      loading,
      error,
    };
  },
};
</script>
