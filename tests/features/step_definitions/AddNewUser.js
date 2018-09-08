const urls = require('./urls');
const  resolve = require('path').resolve;
module.exports = function() {



    const search = (elem, text)=>{
        for(let i = 0; i < elem.length; i++ ){
            if(elem[i] === text){
                return elem[i]
            }
        }
    };
    const search1 = (link, elem, text, edit)=>{
        for(let i = 0; i < link.length; i++ ){
            if(elem[i] === text){
                return edit.value[i]
            }
        }
    };

    this.When(/^я перехожу по ссылке "([^"]*)"$/, function (text) {
        const span = browser.element(`span=${text}`);
        span.waitForExist(5000);
        return span.click();
    });

    this.Then(/^я вижу форму создания пользователя/, function () {
        return browser.url(urls.addUser)
    });

    this.Then(/^выбираю картику пользователя/, function () {
       let file = resolve('imageForTests/1.png');
        browser.chooseFile("input[type=file]", file);
    });

    this.When(/^я ввожу в поле добаления пользователя "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        if(fieldName === 'description'){
            const input = browser.element(`textarea[name="${fieldName}"]`);
            return input.setValue(value);
        }else {
            const input = browser.element(`input[name="${fieldName}"]`);
            return input.setValue(value);
        }
    });


    this.When(/^я выбираю роль ползователя "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        const div = browser.element(`.Select-control`);
        div.click();

        const select = browser.element(`div.Select-option=${value}`);
        return select.click();

    });

    this.When(/^добавляю пользователя "([^"]*)"$/, function (text) {
        const button = browser.element(`button.btn=${text}`);
        button.click();
        if(browser.getUrl() !== urls.allUsers)  return browser.url(urls.allUsers);
    });

    this.Then(/^я вижу всех ползователей/, function () {
        return browser.url(urls.allUsers)
    });

    this.When(/^я вижу созданного пользователя "([^"]*)"$/, function (text) {
        browser.pause(1000);
        const selector = '.one-user-list_username';
        const link = browser.elements(selector).getText();
        const cat = search(link, text);
        return expect(cat).toBe(text)

    });

    this.When(/^я выбираю пользователя для редактирования "([^"]*)"$/, function (text) {
        const selector = '.content_text';
        const link = browser.elements(selector);
        const elem = link.elements('.one-user-list_username');
        const edit = link.elements('.edit_user');
        const btn = search1(link.getText(), elem.getText(), text, edit);
        return btn.click();
    });

    this.When(/^я ввожу в поле редактирования пользователя "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        if(fieldName === 'description'){
            const input = browser.element(`textarea[name="${fieldName}"]`);
            return input.setValue(value);
        }else {
            const input = browser.element(`input[name="${fieldName}"]`);
            return input.setValue(value);
        }
    });

    this.When(/^проверяю отредактированного пользователя на логин со значениями "([^"]*)" и "([^"]*)"$/, function (name, password) {
        browser.url(urls.loginUrl);
        browser.pause(1000);
        const Uname = browser.element(`input[name="username"]`);
        Uname.setValue(name);
        const pass = browser.element(`input[name="password"]`);
        pass.setValue(password);
        const button = browser.element(`button=Войти`);
        return button.click();
    });

    this.When(/^я удаляю пользователя "([^"]*)"$/, function (text) {
        const selector = '.content_text';
        const link = browser.elements(selector);
        const elem = link.elements('.one-user-list_username');
        const del = link.elements('.delete_user');
        const btn = search1(link.getText(), elem.getText(), text, del);
        return btn.click();
    });

    this.When(/^я не вижу созданного пользователя "([^"]*)"$/, function (text) {
        browser.pause(1000);
        const selector = '.one-user-list_username';
        const link = browser.elements(selector);
        const cat = search(link, text);
        return expect(cat).toBe(undefined);
    });

};