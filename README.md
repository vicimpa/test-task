# Тестовая приложуха для собеса

Проект реализует `rest-api` `backend`, на котором есть:
- `/api/users/check` - Поиск пользователя по "бд"
  ```ts
  {
    email: string
    number?: string
  }
  ```
  успешным ответом должен быть
  ```ts
  {
    code: 200
    result: {
      email: string,
      number: string
    }[]
    resultCount: number
  }
  ```

а так же `frontend`, который принимает данные от пользователя в форму и добавляет для отображения запросы. На `backend` реализованы задержка и ограничение на количество одновременных запросов. При попытке получить данные повторно, предыдущий запрос отменяется. Это `fullstack` приложение, поэтому немного поясню:

#### Папочки
- [public](public) - Папочка со статикой для фронта
- [server](server) - Папочка, где реализован `backend`
- [src](src) - Папочка, где реализован фронт

#### Зависимости
- `vite` - Система сборки, которая запускает фронс с бэком (через самописный плагин [server/server.ts](server/server.ts))
- `react` - Библиотека управления состоянием виртуального DOM
- `react-dom` - Библиотека запуска виртуального DOM на реальный
- `@preact/signals-react` - Система сигналов для React, упрощает взаимодействие состояния
- `valibot` - Пакет для валидации данных

#### Архитектура
Back (`./server/*`):
- [📁 models](server/models) - Модели верификации
- [📁 routes](server/routes) - Роутеры приложения
- [📁 services](server/services) - Сервисы приложения
- [📁 utils](server/utils) - Папочка с утилитами
- [app.ts](server/app.ts) - Главный файл приложения
- [data.ts](server/data.ts) - Файлик с данными
- [server.ts](server/server.ts) - Плагин для `vite`

Front (`./src/*`):
- [📁 components](src/components) - Компоненты
- [📁 hooks](src/hooks) - Кастомные хуки
- [📁 utils](src/utils) - Папочка с утилитами
- [app.tsx](src/app.tsx) - Приложение
- [index.html](src/index.html) - Файлик страницы
- [index.sass](src/index.sass) - Файлик стилей
- [index.tsx](src/index.tsx) - Главный скрипт

Core (`./*`):
- [config.ts](config.ts) - Конфигурация всего
- [types.ts](types.ts) - Тут валидаторы типов
- [vite.config.ts](vite.config.ts) - Настройка сборщика
- [tsconfig.json](tsconfig.json) - Настройка TS для фронта
- [tsconfig.node.json](tsconfig.node.json) - Настройка TS для бэка
- [package.json](package.json) - Файлик пакета со скриптами


### Для `dev` запуска
```bash
> npm i
> npm run dev
```

### Для `prod` запуска
```bash
> npm i
> npm run build
> npm run preview
```