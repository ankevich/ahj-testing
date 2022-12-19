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

  test("should show error alert if incorrect card number entered", async () => {
    await page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Номер карты введен неверно");
      await dialog.accept();
    });

    await page.type("#card_number", "6543398765676543");
    await page.click("#submitform");
  });

  test("should show error alert if card number is not 16 digits", async () => {
    await page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Номер карты должен состоять из 16 цифр");
      await dialog.accept();
    });

    await page.type("#card_number", "6543398765");
    await page.click("#submitform");
  });

  test("should show error alert if card number is not only digits", async () => {
    await page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Номер карты должен состоять из цифр");
      await dialog.accept();
    });

    await page.type("#card_number", "6543398765qwerty");
    await page.click("#submitform");
  });

  test("if card is Visa it should able Visa logo", async () => {
    await page.type("#card_number", "4929462761664426");
    
    const visa = await page.$(".visa");
    const visaClass = await page.evaluate((visa) => visa.className, visa);
    expect(visaClass).not.toContain("disabled");
  });

  test("if card is MasterCard it should able MasterCard logo", async () => {
    await page.type("#card_number", "5555555555554444");

    const mastercard = await page.$(".mastercard");
    const mastercardClass = await page.evaluate(
      (mastercard) => mastercard.className,
      mastercard
    );
    expect(mastercardClass).not.toContain("disabled");
  });

  test("if card is Discover it should able Discover logo", async () => {
    await page.type("#card_number", "6762000000000000");

    const maestro = await page.$(".discover");
    const maestroClass = await page.evaluate(
      (maestro) => maestro.className,
      maestro
    );
    expect(maestroClass).not.toContain("disabled");
  });

  test("if card is Mir it should able Mir logo", async () => {
    await page.type("#card_number", "2200000000000000");

    const mir = await page.$(".mir");
    const mirClass = await page.evaluate((mir) => mir.className, mir);
    expect(mirClass).not.toContain("disabled");
  });

  test("if card is JCB it should able JCB logo", async () => {
    await page.type("#card_number", "1130111333300000");

    const jcb = await page.$(".jcb");
    const jcbClass = await page.evaluate((jcb) => jcb.className, jcb);
    expect(jcbClass).not.toContain("disabled");
  });

  test("if card is American Express it should able American Express logo", async () => {
    await page.type("#card_number", "371449635398431");

    const americanExpress = await page.$(".amex");
    const americanExpressClass = await page.evaluate(
      (americanExpress) => americanExpress.className,
      americanExpress
    );
    expect(americanExpressClass).not.toContain("disabled");
  });

  afterEach(async () => {
    await browser.close();
  });
});
