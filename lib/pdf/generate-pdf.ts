import puppeteer from "puppeteer-core";

export async function generatePdf(html: string): Promise<Buffer> {
  const isLocal = process.env.NODE_ENV === "development";

  let executablePath: string;

  if (isLocal) {
    // Windows → Mac → Linux sırasıyla Chrome path
    if (process.platform === "win32") {
      executablePath =
        process.env.CHROME_PATH ??
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    } else if (process.platform === "darwin") {
      executablePath =
        process.env.CHROME_PATH ??
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    } else {
      executablePath = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";
    }
  } else {
    // Vercel / Lambda — @sparticuz/chromium
    const chromium = (await import("@sparticuz/chromium")).default;
    executablePath = await chromium.executablePath();
  }

  const args = isLocal
    ? ["--no-sandbox", "--disable-setuid-sandbox"]
    : (await (await import("@sparticuz/chromium")).default.args);

  const browser = await puppeteer.launch({
    args,
    executablePath,
    headless: true,
    defaultViewport: { width: 1200, height: 800 },
  });

  const page = await browser.newPage();

  // Font yüklemesini bekle
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: true,
  });

  await browser.close();
  return Buffer.from(pdf);
}
