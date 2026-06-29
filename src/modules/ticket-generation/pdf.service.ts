import puppeteer from "puppeteer";

export const generatePdf = async (html: string, filePath: string) => {
   const browser = await puppeteer.launch();

   const page = await browser.newPage();

   await page.setContent(html, {
      waitUntil: "load",
   });

   await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
   });

   await browser.close();
};  
