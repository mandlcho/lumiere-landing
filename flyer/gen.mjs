import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve, join } from 'path';

const dir = resolve('.');
const files = (await readdir(dir))
  .filter(f => f.startsWith('flyer-') && f.endsWith('.html'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/flyer-(\d+)/)[1]);
    const numB = parseInt(b.match(/flyer-(\d+)/)[1]);
    return numA - numB;
  });

console.log(`Rendering ${files.length} flyers...`);

const width = Math.round(210 * 96 / 25.4);
const height = Math.round(148 * 96 / 25.4);
const browser = await puppeteer.launch({ headless: true });
const pdfBuffers = [];

for (const file of files) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(`file://${join(dir, file)}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 500));
  const buf = await page.pdf({
    width: '210mm',
    height: '148mm',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });
  pdfBuffers.push(buf);
  console.log(`  ${file}`);
  await page.close();
}

await browser.close();

// Merge with pdf-lib
console.log('Merging...');
const merged = await PDFDocument.create();
for (const buf of pdfBuffers) {
  const doc = await PDFDocument.load(buf);
  const [page] = await merged.copyPages(doc, [0]);
  merged.addPage(page);
}

const out = await merged.save();
await writeFile(join(dir, 'TheRealtyDept-Flyers.pdf'), out);
console.log('Done! TheRealtyDept-Flyers.pdf');
