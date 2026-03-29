import { chromium } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "images");

const pages = [
  { name: "dashboard", path: "/dashboard" },
  { name: "reports", path: "/dashboard/reports" },
];

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const page of pages) {
    const p = await context.newPage();
    await p.goto(`${BASE_URL}${page.path}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(1000);

    const file = path.join(OUT_DIR, `${page.name}.png`);
    await p.screenshot({ path: file, fullPage: false });
    console.log(`Saved: ${file}`);
    await p.close();
  }

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
