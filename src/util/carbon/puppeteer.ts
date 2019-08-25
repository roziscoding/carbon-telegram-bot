// Packages
import puppeteer from 'puppeteer'

export type ScreenshotOptions = {
  url: string,
  timeout?: number
}

export async function getScreenshotFromUrl ({ url, timeout = 2000 }: ScreenshotOptions) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  })

  const page = await browser.newPage()

  // Set viewport to something big
  // Prevents Carbon from cutting off lines
  await page.setViewport({
    width: 1600,
    height: 1000,
    deviceScaleFactor: 2
  })

  await page.goto(url, { waitUntil: 'load' })

  const exportContainer = await page.waitForSelector('#export-container')
  const elementBounds = await exportContainer.boundingBox()

  if (!elementBounds) throw new Error('Cannot get export container bounding box')

  const buffer = await exportContainer.screenshot({
    encoding: 'binary',
    clip: {
      ...elementBounds,
      // This avoids a black line towards the left and bottom side of images,
      // which only occured when certain fonts were used, see https://goo.gl/JHHskx
      x: Math.round(elementBounds.x),
      height: Math.round(elementBounds.height) - 1
    }
  })

  // Wait some more as `waitUntil: 'load'` or `waitUntil: 'networkidle0'
  // is not always enough, see https://goo.gl/eTuogd
  await page.waitFor(timeout)
  // Close browser
  await browser.close()

  return buffer
}
