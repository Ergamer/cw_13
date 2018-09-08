const urls = require('./urls');

module.exports = function () {

    const search = (elem, text)=>{
      for(let i = 0; i < elem.length; i++ ){
          if(elem[i] === text){
              return elem[i]
          }
      }
    };

    this.When(/^я перехожу на "([^"]*)"$/, function (text) {
        const span = browser.element(`a=${text}`);
        span.click();
    });

    this.Then(/^я вижу форму создания Категории/, function () {
        return browser.url(urls.addCategory)
    });


    this.When(/^я ввожу в поле добаления Категории "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        const input = browser.element(`input[name="${fieldName}"]`);
        return input.setValue(value);
    });

    this.When(/^я ввожу в поле добаления Категории описание "([^"]*)" значение "([^"]*)"$/, function (fieldName, value) {
        const input = browser.element(`textarea[name="${fieldName}"]`);
        return input.setValue(value);
    });

    this.When(/^сохраняю категорию "([^"]*)"$/, function (text) {
        const button = browser.element(`.add-category-form_save=${text}`);
        return button.click();
    });

    this.When(/^я вижу новую категорию в списке "([^"]*)"$/, function (text) {
        browser.pause(2000);
        const selector = '.categories_item';
        const categoryName = browser.elements(selector).getText();
        const cat = search(categoryName, text);
        return expect(cat).toBe(text)

    });

    this.When(/^я выбираю категорию для редактирования "([^"]*)"$/, function (text) {
        const selector = `.categories_item=${text}`;
        const categoryName = browser.element(selector);
        const elem = categoryName.element('.categories_item_edit');
        return elem.click();
    });

    this.When(/^я удаляю категорию "([^"]*)"$/, function (text) {
        const selector = `.categories_item=${text}`;
        const categoryName = browser.element(selector);
        const elem = categoryName.element('.categories_item_delete');
        return elem.click();
    });


    this.When(/^я не вижу новую категорию в списке "([^"]*)"$/, function (text) {
        browser.pause(2000);
        const selector = '.categories_item';
        const categoryName = browser.elements(selector).getText();
        const cat = search(categoryName, text);
        return expect(cat).toBe(undefined)
    });

};