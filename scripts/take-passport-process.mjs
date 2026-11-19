import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/e0c9f16d-03ef-437e-922d-95f7fad8c1fc';
const PORT = 9223;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('Launching headless Edge for passport process screenshot...');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=d:\\LNTT\\.edge_cdp_profile_proc',
    '--window-size=1200,900',
    'http://localhost:5173/?view=passport&id=SP001'
  ]);

  await sleep(3000);

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const tabs = await listRes.json();
    const targetTab = tabs.find(t => t.url.includes('5173')) || tabs[0];
    if (!targetTab || !targetTab.webSocketDebuggerUrl) {
      throw new Error('No tab with webSocketDebuggerUrl found');
    }

    console.log('Connecting to WebSocket:', targetTab.webSocketDebuggerUrl);
    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const curId = id++;
      const onMsg = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', onMsg);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    console.log('Connected to CDP');

    await send('Page.enable');
    await send('DOM.enable');

    // Wait for content to render
    await sleep(2000);

    // Scroll to the process section
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('process') || document.querySelector('section#process');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      `
    });

    await sleep(1000);

    // Capture screenshot of desktop
    const snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    const snapBuf = Buffer.from(snap.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, 'preview_crafting_process.jpg');
    fs.writeFileSync(outPath, snapBuf);
    console.log(`Saved desktop screenshot to ${outPath} (${snapBuf.length} bytes)`);

    // Now emulate mobile viewport (matching user's phone)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 430,
      height: 932,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(1000);

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('process');
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 50;
          window.scrollTo(0, y);
        }
      `
    });
    await sleep(1500);

    const snapMob = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    const mobPath = path.join(ARTIFACT_DIR, 'preview_crafting_process_mobile.jpg');
    fs.writeFileSync(mobPath, Buffer.from(snapMob.data, 'base64'));
    console.log(`Saved mobile screenshot to ${mobPath}`);

    // Now navigate to Home page to capture Home process section
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2500);

    await send('Runtime.evaluate', {
      expression: `
        const h = Array.from(document.querySelectorAll('h3')).find(e => e.textContent.includes('Bước chế tác'));
        if (h) {
          h.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      `
    });
    await sleep(1500);

    const snapHome = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    const homePath = path.join(ARTIFACT_DIR, 'preview_home_crafting_steps.jpg');
    fs.writeFileSync(homePath, Buffer.from(snapHome.data, 'base64'));
    console.log(`Saved homepage crafting screenshot to ${homePath}`);

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    edge.kill();
  }
}

main();
