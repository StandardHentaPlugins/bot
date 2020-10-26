# HENTA Плагин: common/bot
Связующее ядро для вашего бота

```js
const botPlugin = henta.getPlugin('common/bot');
```

## Создание своего обработчика
Зарегистрируйте свой обработчик с помощью вызова функции **setHandler**
```js
init(henta) {
  const botPlugin = henta.getPlugin('common/bot');
  botPlugin.setHandler('my-handler', (ctx, next) => {
    ctx.answer('Hello world!');
    return next();
  });
}
```
А после вы можете добавить обработчик в **config/bot.json**.

## Свойства и методы MessageContext (ctx)
Ссылка на botPlugin
```js
  const botPlugin = ctx.bot;
```
Ссылка на henta
```js
  const henta = ctx.henta;
```
Ссылка на VK
```js
  const vk = ctx.vk;
```
Ссылка на VK API
```js
  const vkApi = ctx.api;
```
Ответить на пользовательское сообщение
```js
  ctx.answer('Hi');
  // Или
  ctx.answer([
    'Hi!',
    'Next line'
  ]);
  // Или
  ctx.answer({
    message: 'Hi!',
    attachment: 'https://vk.com'
  });
```
Отправить сообщение пользователю
```js
  ctx.send('Hi');
  // Подходит всё, как в answer
```
Создать MessageBuilder
```js
  const messageBuilder = ctx.builder();
  // Созданный таким методом builder имеет функцию answer
```
Получить плагин
```js
  const myPlugin = ctx.getPlugin('bot/my');
```
Получить значение из payload, если оно есть
```js
  const command = ctx.getPayloadValue('command');
  // Вернёт "тест", если payload будет { "command": "тест" }
```

## Свойства и методы MessageBuilder
Установить вспомогательные значения
```js
  builder.setContext({
    peerId: 0,
    vk: henta.vk,
    henta: henta
  });
```
Отправить сообщение
```js
  builder.send(messageData);
```
Отправить сообщение нескольким получателям
```js
  builder.multiSend(peerIds);
```
Добавить к сообщению "\nTEXT" (Если сообщения нет, то \n не поставится)
```js
  builder.line('Hi');
```
Добавить к сообщению несколько линий
```js
  builder.lines(['Hi', 'next line']);
```
Добавить к сообщению текст без переносов
```js
  builder.text('Hi');
```
Манипуляция текстом
```js
  builder.manageText(str => str ? 'тут был текст' : 'тут нет текста');
```
Добавить клавиатуру
```js
  builder.keyboard(vkIoKeyboard);
```
Прикрепить что-нибудь
```js
  builder.attach('photo-131358170_457239073');
```
Прикрепить аудио-сообщение
```js
  builder.audioMessage('http://mp3-fast.ru/mp3_2/fastmp3-org-e330-zvyozdy-55331555.mp3');
```
Прикрепить фотографию
```js
  builder.photo('https://sun9-72.userapi.com/c850428/v850428268/53e47/QMJ1z5oFFuc.jpg');
```
Прикрепить кэшированную фотографию (требуется плагин common/imageCache)
```js
  builder.cachedPhoto('my-cool-photo', () => {
    // Тут можно сгенерировать canvas или сделать ещё что-нибудь.
    // Но я просто верну фотографию с котиком
    return 'https://sun9-24.userapi.com/c824411/v824411719/bdfe/n-ng8CKs_00.jpg';
  });

  // А ещё можно так
  builder.cachedPhoto('https://sun9-24.userapi.com/c824411/v824411719/bdfe/n-ng8CKs_00.jpg');
```
Получить клавиатуру (вернёт undefinded, если клавиатура не определена)
```js
  const keyboard = builder.getKeyboard();
  keyboard.textButton({ label: 'Пиу пах..', payload: { command: 'тест' } });
  keyboard.oneTime();
```
