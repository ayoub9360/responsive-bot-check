const scraperObject = {
  url: 'https://exemple.com/sitemap.xml',
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.waitForSelector('loc');
    let urls = await page.$$eval('loc', links => {
      // Extract the links from the data
      links = links.map(el => el.innerHTML)
      return links;
    });
    await page.setViewport({ width: 1920, height: 1080});
    for (let i = 0; i < urls.length; i++) {
      await page.goto(urls[i], {waitUntil: 'networkidle2'})
      let title = await page.title()
      console.log(title);
      await page.screenshot({path: `screenshoot/${title}.png`, fullPage: true});
      console.log(`✅ ${urls[i]}`)
    }
    browser.close();
  }
}

module.exports = scraperObject;