describe('интерграционное тестирование', () => {
  beforeEach(() => {
    // Перехват запроса и возврат моковых данных
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    // Переход на страницу конструктора
    cy.visit('http://localhost:4000/');
  });
  afterEach(() => {
    // Очистка моковых данных
    cy.clearCookies();
  });
  it('добавление ингредиентов и булки в конструктор', () => {
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
    // Находим и добавляем булку
    cy.get('[data-ingredient="bun"]').find(`button`).first().click();
    // Находим и добавляем ингредиент
    cy.get('[data-ingredient="noBun"]').find('button').first().click();
    // Проверяем, что верхняя булка добавлена
    cy.get('[data-constructor="bun"]')
      .eq(0)
      .find('.constructor-element__text')
      .should('have.text', 'Флюоресцентная булка R2-D3 (верх)');
    // Проверяем, что нижняя булка добавлена
    cy.get('[data-constructor="bun"]')
      .eq(1)
      .find('.constructor-element__text')
      .should('have.text', 'Флюоресцентная булка R2-D3 (низ)');
    // Проверяем, что ингредиент добавлен
    cy.get('[data-constructor="noBun"]')
      .find('.constructor-element__text')
      .should('have.text', 'Филе Люминесцентного тетраодонтимформа');
  });
  describe('тестирование работы модальных окон', () => {
    it('открытие модального окна ингредиента', () => {
      // Находим ингредиент и открываем модалку
      cy.get('[data-ingredient="bun"]')
        .find('[data-ingredient="name"]')
        .contains('Флюоресцентная булка R2-D3')
        .click();
      // Проверяем, что модалка открылась
      cy.get('[id="modals"]').should('not.be.empty');
      // Проверяем, что в открытом модальном окне отображаются данные именно того ингредиента, по которому был совершен клик
      cy.get('[data-ingredient="modal-name"]').should(
        'have.text',
        'Флюоресцентная булка R2-D3'
      );
    });
    it('закрытие по клику на крестик', () => {
      // Находим ингредиент и открываем модалку
      cy.get('[data-ingredient="noBun"]').first().click();
      // Находим кнопку закрытия и закрываем модалку
      cy.get('[id="modals"]').find('button').click();
      //обязательно проверяем что окно закрылось
      cy.get('[id="modals"]').should('be.empty');
    });
    it('закрытие по клику на оверлей', () => {
      // Находим ингредиент и открываем модалку
      cy.get('[data-ingredient="noBun"]').eq(1).click();
      // Находим оверлэй и закрываем модалку
      cy.get('[data-cy="modal-overlay"]').click('left', { force: true });
      //обязательно проверяем что окно закрылось
      cy.get('[id="modals"]').should('be.empty');
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
      cy.get('[data-ingredient="bun"]').find('button').first().click();
      cy.get('[data-ingredient="noBun"]').find('button').first().click();
      cy.get('[data-ingredient="noBun"]').find('button').eq(1).click();
      // Проверяем, что конструктор заполнен
      cy.get('[data-constructor="bun"]').should('have.length', 2);
      cy.get('[data-constructor="noBun"]').should('have.length', 2);
      // Перехват отправки заказа с токеном
      cy.intercept('POST', 'api/orders', (req) => {
        req.reply({ fixture: 'order.json' });
      }).as('createOrder');
      // Клик по кнопке «Оформить заказ»
      cy.get('[data-cy="order-button"]').find('button').click();
      cy.wait('@createOrder');
      // Проверка модалки
      cy.get('[id="modals"]').should('not.be.empty');
      cy.get('[id="modals"]').find('h2').should('have.text', '64954');
      // Закрытие модалки
      cy.get('[id="modals"]').find('button').click();
      cy.get('[id="modals"]').should('be.empty');
      // Проверка, что конструктор пуст
      cy.get('[data-constructor="bun"]').should('have.length', 0);
      cy.get('[data-constructor="noBun"]').should('have.length', 0);
    });
  });
});
