const testUrl = 'http://localhost:4000/';
const dataIngredientBun = '[data-ingredient="bun"]';
const dataIngredientNoBun = '[data-ingredient="noBun"]';
const dataIngredientName = '[data-ingredient="name"]';
const dataIngredientModalName = '[data-ingredient="modal-name"]';
const idModals = '[id="modals"]';
const dataConstructorBun = '[data-constructor="bun"]';
const dataConstructorNoBun = '[data-constructor="noBun"]';

describe('интерграционное тестирование', () => {
  beforeEach(() => {
    // Перехват запроса и возврат моковых данных
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Переход на страницу конструктора
    cy.visit(testUrl);
  });

  afterEach(() => {
    // Очистка моковых данных
    cy.clearCookies();
  });

  it('добавление ингредиентов и булки в конструктор', () => {
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');

    // Находим и добавляем булку
    cy.get(dataIngredientBun).find(`button`).first().click();

    // Находим и добавляем ингредиент
    cy.get(dataIngredientNoBun).find('button').first().click();

    // Проверяем, что верхняя булка добавлена
    cy.get(dataConstructorBun)
      .eq(0)
      .find('.constructor-element__text')
      .should('have.text', 'Флюоресцентная булка R2-D3 (верх)');

    // Проверяем, что нижняя булка добавлена
    cy.get(dataConstructorBun)
      .eq(1)
      .find('.constructor-element__text')
      .should('have.text', 'Флюоресцентная булка R2-D3 (низ)');

    // Проверяем, что ингредиент добавлен
    cy.get(dataConstructorNoBun)
      .find('.constructor-element__text')
      .should('have.text', 'Филе Люминесцентного тетраодонтимформа');
  });

  describe('тестирование работы модальных окон', () => {
    it('открытие модального окна ингредиента', () => {
      // Находим ингредиент и открываем модалку
      cy.get(dataIngredientBun)
        .find(dataIngredientName)
        .contains('Флюоресцентная булка R2-D3')
        .click();

      // Проверяем, что модалка открылась
      cy.get(idModals).should('not.be.empty');

      // Проверяем, что в открытом модальном окне отображаются данные именно того ингредиента, по которому был совершен клик
      cy.get(dataIngredientModalName).should(
        'have.text',
        'Флюоресцентная булка R2-D3'
      );
    });

    it('закрытие по клику на крестик', () => {
      // Находим ингредиент и открываем модалку
      cy.get(dataIngredientNoBun).first().click();

      // Находим кнопку закрытия и закрываем модалку
      cy.get(idModals).find('button').click();

      //обязательно проверяем что окно закрылось
      cy.get(idModals).should('be.empty');
    });

    it('закрытие по клику на оверлей', () => {
      // Находим ингредиент и открываем модалку
      cy.get(dataIngredientNoBun).eq(1).click();

      // Находим оверлэй и закрываем модалку
      cy.get('[data-cy="modal-overlay"]').click('left', { force: true });

      //обязательно проверяем что окно закрылось
      cy.get(idModals).should('be.empty');
    });
  });

  describe('Собирается бургер', () => {
    beforeEach(() => {
      // Настройка мокового токена
      const mockToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWZkZjgwNzUwODY0MDAxZDM3MThkNSIsImlhdCI6MTczNjI3MTMyMCwiZXhwIjoxNzM2MjcyNTIwfQ.KvJjLjySiRHUhc8P2ZxtwRjP7DQ5n6b7a47bFniMoXQ';
      cy.setCookie('accessToken', mockToken);

      // Перехват запроса с добавлением заголовка Authorization
      cy.intercept('GET', 'api/auth/user', (req) => {
        req.headers['Authorization'] = mockToken;
        req.reply({ fixture: 'user.json' });
      }).as('getUser');
    });

    it('Создание и оформление заказа', () => {
      cy.wait('@getUser');

      // Собирается бургер
      cy.get(dataIngredientBun).find('button').first().click();
      cy.get(dataIngredientNoBun).find('button').first().click();
      cy.get(dataIngredientNoBun).find('button').eq(1).click();

      // Проверяем, что конструктор заполнен
      cy.get(dataConstructorBun).should('have.length', 2);
      cy.get(dataConstructorNoBun).should('have.length', 2);

      // Перехват отправки заказа с токеном
      cy.intercept('POST', 'api/orders', (req) => {
        req.reply({ fixture: 'order.json' });
      }).as('createOrder');

      // Клик по кнопке «Оформить заказ»
      cy.get('[data-cy="order-button"]').find('button').click();
      cy.wait('@createOrder');

      // Проверка модалки
      cy.get(idModals).should('not.be.empty');
      cy.get(idModals).find('h2').should('have.text', '64954');

      // Закрытие модалки
      cy.get(idModals).find('button').click();
      cy.get(idModals).should('be.empty');

      // Проверка, что конструктор пуст
      cy.get(dataConstructorBun).should('have.length', 0);
      cy.get(dataConstructorNoBun).should('have.length', 0);
    });
  });
});
