const urls = require('./urls');

module.exports = function() {
  this.When(/^я нажимаю на Выберите дату$/, function () {
    const div = browser.element('.datePicker');
    return div.click();
  });

  this.When(/^я нажимаю на кнопку "([^"]*)"$/, function (arg) {
    const div = browser.element(`button=${arg}`);
    return div.click();
  });

  this.When(/^затем я нажимаю на кнопку "([^"]*)"$/, function (arg) {
    const div = browser.element(`button=${arg}`);
    return div.click();
  });

  this.When(/^я вижу сообщение об успешном создании задачи$/, function () {
    browser.pause(1000);
    const notification = browser.element('.notification-message .title');
    notification.waitForExist(5000);

    const notificationText = notification.getText();
    notification.click();

    return expect(notificationText).toBe('Задача успешно создана!');
  });

  this.When(/^я нажимаю на плюсик$/, function () {
    browser.pause(1000);
    const button = browser.element('.plus-icon');
    return button.click();
  });

  this.When(/^я вижу поле "([^"]*)"$/, function (arg) {
    const div = browser.element(`.stage-number`);
    div.waitForExist(5000);

    const text = div.getText();
    return expect(text).toBe(arg);
  });
  this.When(/^заполняю поле заголовок типа "([^"]*)"$/, function (arg) {
    const input = browser.element('input[name=title]');
    return input.setValue(arg);
  });
  this.When(/^заполняю поле описание типа "([^"]*)"$/, function (arg) {
    const input = browser.element('input[name=description]');
    return input.setValue(arg);
  });
  this.When(/^также нажимаю на поле "([^"]*)"$/, function (arg) {
    const input = browser.element('input[name=date]');
    return input.click();
  });
  this.When(/^также нажимаю на копку "([^"]*)"$/, function (arg) {
    const div = browser.element(`button=${arg}`);
    return div.click();
  });
  this.When(/^нажимаю на дискету$/, function () {
    const div = browser.element('button.stage-footer-icons.save');
    return div.click();
  });
  this.When(/^нажимаю на кнопу выполнить$/, function () {
    const div = browser.element('div.stage-footer-icons.done');
    return div.click();
  });
  this.When(/^нажимаю на кнопку да$/, function () {
    const div = browser.element('button=Да!');
    return div.click();
  });
  this.When(/^нажимаю на кнопку ОК$/, function () {
    const div = browser.element('button.swal2-confirm');
    div.waitForExist(5000);
    return div.click();
  });
  this.When(/^вижу текст "([^"]*)"$/, function (arg) {
    const div = browser.element(`.task-completed`);
    div.waitForExist(5000);

    const text = div.getText();
    return expect(text).toBe(arg);
  });
  this.When(/^нажимаю на кнопку удалить$/, function () {
    const div = browser.element('div.stage-footer-icons.delete');
    return div.click();
  });
  this.When(/^дальше нажимаю на кнопку "([^"]*)"$/, function (arg) {
    const btn = browser.element(`button=${arg}`);
    return btn.click();
  });
  this.When(/^нажимаю на последнюю кнопку "([^"]*)"$/, function (arg) {
    browser.pause(1000);
    const btn = browser.element(`button=${arg}`);
    return btn.click();
  });
  this.When(/^я вижу сообщение об успешном сохранении изменений$/, function () {
    browser.pause(1000);
    const notification = browser.element('.notification-message .title');
    notification.waitForExist(5000);

    const notificationText = notification.getText();

    return expect(notificationText).toBe('Изменения сохранены!');
  });
};
