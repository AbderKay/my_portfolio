/**
 * Regenerate favicon rasters from public/favicon.co/icon.svg using sharp.
 * Usage:  NODE_PATH=./node_modules node scripts/gen-favicon.js
 * Outputs: favicon.ico (32, PNG-in-ICO), icon.png (512), apple-icon.png (180).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "favicon.co");
const svg = fs.readFileSync(path.join(dir, "icon.svg"));

/** Wrap a PNG buffer in a minimal single-image ICO container. */
function icoFromPng(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size % 256, 0); // width (0 => 256)
  entry.writeUInt8(size % 256, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // data size
  entry.writeUInt32LE(22, 12); // data offset
  return Buffer.concat([header, entry, pngBuf]);
}

(async () => {
  fs.writeFileSync(path.join(dir, "icon.png"), await sharp(svg).resize(512, 512).png().toBuffer());
  fs.writeFileSync(path.join(dir, "apple-icon.png"), await sharp(svg).resize(180, 180).png().toBuffer());
  const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(dir, "favicon.ico"), icoFromPng(png32, 32));
  console.log("favicon assets regenerated in", dir);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
