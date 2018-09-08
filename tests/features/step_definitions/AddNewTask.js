const urls = require('./urls');

module.exports = function() {

    this.When(/^я перехожу на задачу "([^"]*)"$/, function (text) {
        const span = browser.element(`a=${text}`);
        span.click();
    });

    this.Then(/^я вижу форму создания таска/, function () {
        return browser.url(urls.addTask)
    });

    this.When(/^я выбираю ползователя "([^"]*)"$/, function (user) {
        const div = browser.element(`.Select-placeholder=Выберите пользователя`);
        div.click();

        const select = browser.element(`div.Select-option=${user}`);
        return select.click();

    });

    this.When(/^я ввожу в поле добаления таска "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        const input = browser.element(`input[name="${fieldName}"]`);
        return input.setValue(value);
    });


    this.When(/^я выбираю категорию "([^"]*)"$/, function (category) {
        const div = browser.element(`div.Select-placeholder=Выберите категорию`);
        div.click();

        const select = browser.element(`.Select-option=${category}`);
        return select.click();

    });


};
