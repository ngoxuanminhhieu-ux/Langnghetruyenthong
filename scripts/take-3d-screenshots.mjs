import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Admin/.gemini/antigravity/brain/e0c9f16d-03ef-437e-922d-95f7fad8c1fc';
const PORT = 9222;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('Starting Edge headless with remote debugging...');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=d:\\LNTT\\.edge_cdp_profile',
    '--window-size=1400,950',
    'http://localhost:5173/'
  ]);

  await sleep(2500);

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const tabs = await listRes.json();
    console.log('Open tabs:', tabs.length);
    const targetTab = tabs.find(t => t.url.includes('5173')) || tabs[0];
    if (!targetTab || !targetTab.webSocketDebuggerUrl) {
      throw new Error('No target tab found with webSocketDebuggerUrl');
    }

    console.log('Connecting to WebSocket:', targetTab.webSocketDebuggerUrl);
    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    const send = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const curId = id++;
        pending.set(curId, { resolve, reject });
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    };

    console.log('Enabling Page & Runtime...');
    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Waiting for Three.js render loop to stabilize (4s)...');
    await sleep(4000);

    // Scroll to the 3D Section
    console.log('Scrolling to 3D customizer section...');
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('home-customizer-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await sleep(1500);

    // Helper to capture screenshot
    async function capture(fileName, label) {
      console.log(`Capturing ${label} -> ${fileName}...`);
      const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
      const buffer = Buffer.from(data, 'base64');
      fs.writeFileSync(path.join(ARTIFACT_DIR, fileName), buffer);
      fs.writeFileSync(path.join('d:\\LNTT', fileName), buffer);
      console.log(`Saved ${fileName} (${buffer.length} bytes)`);
    }

    // 1. Capture Pen (index 0)
    console.log('Selecting Bút Ký (index 0)...');
    await send('Runtime.evaluate', {
      expression: `
        const btn0 = document.querySelector('[data-product-idx="0"]');
        if (btn0) btn0.click();
      `
    });
    await sleep(2000);
    await capture('preview_3d_pen.jpg', 'Bút Ký Khảm Trai 3D');

    // 2. Click Bowl (Product button index 1)
    console.log('Selecting Bát Cẩn Trứng (index 1)...');
    await send('Runtime.evaluate', {
      expression: `
        const btn1 = document.querySelector('[data-product-idx="1"]');
        if (btn1) btn1.click();
      `
    });
    await sleep(2500);
    await capture('preview_3d_bowl.jpg', 'Bát Cẩn Trứng 3D');

    // 3. Click Bangle (Product button index 2)
    console.log('Selecting Vòng Tay Bản Liền (index 2)...');
    await send('Runtime.evaluate', {
      expression: `
        const btn2 = document.querySelector('[data-product-idx="2"]');
        if (btn2) btn2.click();
      `
    });
    await sleep(2500);
    await capture('preview_3d_bangle.jpg', 'Vòng Tay Bản Liền 3D');

    // 4. Click Beads (Product button index 3)
    console.log('Selecting Chuỗi Hạt (index 3)...');
    await send('Runtime.evaluate', {
      expression: `
        const btn3 = document.querySelector('[data-product-idx="3"]');
        if (btn3) btn3.click();
      `
    });
    await sleep(2500);
    await capture('preview_3d_beads.jpg', 'Chuỗi Hạt Xà Cừ 3D');

    // 5. Click Charms (Product button index 4)
    console.log('Selecting Set Charm (index 4)...');
    await send('Runtime.evaluate', {
      expression: `
        const btn4 = document.querySelector('[data-product-idx="4"]');
        if (btn4) btn4.click();
      `
    });
    await sleep(2500);
    await capture('preview_3d_charms.jpg', 'Set Charm Xà Cừ 3D');

    ws.close();
  } catch (err) {
    console.error('Error during CDP testing:', err);
  } finally {
    edge.kill();
  }
}

main();
