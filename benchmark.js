import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

// 번들 사이즈 계산
function getDirectorySize(dirPath) {
  let totalSize = 0;

  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);

    // console.log("stats", stats);
    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach((file) => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }
  // console.log("totalSize", totalSize);

  if (fs.existsSync(dirPath)) {
    // console.log("dirPath", dirPath);
    calculateSize(dirPath);
  }

  return totalSize;
}

function formatSize(bytes) {
  return (bytes / 1024).toFixed(2) + " KB";
}

function formatTime(ms) {
  return ms >= 1000 ? (ms / 1000).toFixed(2) + "s" : ms.toFixed(0) + "ms";
}

async function cleanDist() {
  if (fs.existsSync("dist")) {
    fs.rmSync("dist", { recursive: true, force: true });
  }
  if (fs.existsSync("dist-vite")) {
    fs.rmSync("dist-vite", { recursive: true, force: true });
  }
}

async function benchmark() {
  console.log("🧹 빌드 디렉토리 정리 중...\n");
  await cleanDist();

  const results = {};

  // Rolldown 빌드
  console.log("🚀 Rolldown 빌드 시작...");
  const rolldownStart = Date.now();
  try {
    await execAsync("rolldown -c rolldown.config.ts");
    results.rolldown = {
      time: Date.now() - rolldownStart,
      size: getDirectorySize("dist"),
      success: true,
    };
    console.log(
      `✅ Rolldown 빌드 완료: ${formatTime(results.rolldown.time)}\n`
    );
  } catch (error) {
    console.error("❌ Rolldown 빌드 실패:", error.message, "\n");
    results.rolldown = { time: 0, size: 0, success: false };
  }

  // Vite 빌드
  console.log("⚡ Vite 빌드 시작...");
  const viteStart = Date.now();
  try {
    await execAsync("vite build --outDir dist-vite");
    results.vite = {
      time: Date.now() - viteStart,
      size: getDirectorySize("dist-vite"),
      success: true,
    };
    console.log(`✅ Vite 빌드 완료: ${formatTime(results.vite.time)}\n`);
  } catch (error) {
    console.error("❌ Vite 빌드 실패:", error.message, "\n");
    results.vite = { time: 0, size: 0, success: false };
  }

  // 결과 출력
  console.log("═══════════════════════════════════════════");
  console.log("성능 비교 결과");
  console.log("═══════════════════════════════════════════\n");

  console.log("빌드 시간:");
  console.log(`  Rolldown: ${formatTime(results.rolldown.time)}`);
  console.log(`  Vite:     ${formatTime(results.vite.time)}`);

  if (results.rolldown.success && results.vite.success) {
    const timeDiff = results.vite.time - results.rolldown.time;
    const percentage = ((timeDiff / results.vite.time) * 100).toFixed(1);
    console.log(
      `  차이:     ${timeDiff > 0 ? "✨" : "⚠️"} Rolldown이 ${Math.abs(
        percentage
      )}% ${timeDiff > 0 ? "빠름" : "느림"}`
    );
  }

  console.log("\n번들 크기:");
  console.log(`  Rolldown: ${formatSize(results.rolldown.size)}`);
  console.log(`  Vite:     ${formatSize(results.vite.size)}`);

  if (results.rolldown.success && results.vite.success) {
    const sizeDiff = results.vite.size - results.rolldown.size;
    const percentage = ((Math.abs(sizeDiff) / results.vite.size) * 100).toFixed(
      1
    );
    console.log(
      `  차이:     ${sizeDiff > 0 ? "📉" : "📈"} Rolldown이 ${percentage}% ${
        sizeDiff > 0 ? "작음" : "큼"
      }`
    );
  }

  console.log("\n═══════════════════════════════════════════");

  // 파일 구조 비교
  if (results.rolldown.success) {
    console.log("\n📁 Rolldown 출력 파일:");
    listFiles("dist", "  ");
  }

  if (results.vite.success) {
    console.log("\n📁 Vite 출력 파일:");
    listFiles("dist-vite", "  ");
  }
}

function listFiles(dirPath, indent = "") {
  if (!fs.existsSync(dirPath)) return;

  const items = fs.readdirSync(dirPath);
  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      console.log(`${indent}📂 ${item}/`);
      listFiles(fullPath, indent + "  ");
    } else {
      console.log(`${indent}📄 ${item} (${formatSize(stats.size)})`);
    }
  });
}

// 실행
benchmark().catch(console.error);
