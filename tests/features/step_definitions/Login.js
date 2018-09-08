const urls = require('./urls');

module.exports = function() {
  this.Given(/^я захожу на страницу логина/, function () {
    return browser.url(urls.loginUrl);
  });

  this.When(/^я ввожу в поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
    const input = browser.element(`input[name="${fieldName}"]`);
    return input.setValue(value);
  });

  this.When(/^нажимаю на кнопку "([^"]*)"$/, function (text) {
    const button = browser.element(`button=${text}`);
    return button.click();
  });

  this.Then(/^я вижу сообщение об успешном логине/, function () {
    const notification = browser.element('.notification-message .title');
    notification.waitForExist(5000);

    const notificationText = browser.element('.notification-message .title').getText();

    return expect(notificationText).toBe('User and password correct!');
  });
  this.Then(/^я вижу сообщение о неправильном пароле/, function () {
      const notification = browser.element('span.error');
      notification.waitForExist(5000);


    const error = browser.element('span.error').getText();

    return expect(error).toBe('Password is wrong!');
  });
  this.Then(/^я вижу сообщение пользователь не найден/, function () {


    const error = browser.element('span.error').getText();

    return expect(error).toBe('Username not found');
  });
}; 