import puppeteer from "puppeteer";

// Написать тест для проверки валидности карты.
// Номер карты должен состоять из 16 цифр, должен быть введен только номер карты, без пробелов и дефисов.
// После нажатия на кнопку "проверить" должен появиться алерт "Все верно".
// ID поля ввода номера карты card_number. ID кнопки проверки submitform.
describe("Card number validation", () => {
  let browser;
  let page;
  jest.setTimeout(10000);

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 0,
      devtools: false,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:8080");
  });

  test("page start", async () => {
    await page.waitForSelector("body");
  });

  test("should show success alert if correct card number entered", async () => {
    await page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Все верно");
      await dialog.accept();
    });

    await page.type("#card_number", "4929462761664426");
    await page.click("#submitform");
  });

  afterEach(async () => {
    await browser.close();
  });
});
