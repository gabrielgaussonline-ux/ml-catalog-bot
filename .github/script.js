const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = 'https://www.mercadolibre.com.ar/p/MLA23611312/s';
  console.log('Abriendo:', url);

  await page.goto(url, { waitUntil: 'networkidle' });

  const hasState = await page.evaluate(() => {
    return typeof window.__PRELOADED_STATE__ !== 'undefined';
  });

  console.log('¿Existe __PRELOADED_STATE__?', hasState);

  if (hasState) {
    const keys = await page.evaluate(() =>
      Object.keys(window.__PRELOADED_STATE__)
    );
    console.log('Claves raíz:', keys);
  }

  await browser.close();
})();
