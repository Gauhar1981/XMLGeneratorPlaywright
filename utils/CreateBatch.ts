import { test } from "@playwright/test";
import fs from "fs";
import path from "path";


export function createBatch()
{
const xmlDir = path.join(__dirname, "../output/claims");
const batFilePath = path.join(xmlDir, "process-claims.bat");

const xmlFiles = fs
  .readdirSync(xmlDir)
  .filter(file => file.endsWith(".xml"));

let batContent = `@echo off
echo Processing XML files...
`;

for (const file of xmlFiles) {
  batContent += `echo Processing ${file}\n`;
  // Example real command:
  // batContent += `someUploader.exe "${file}"\n`;
}

batContent += `
echo All files processed.
pause
`;

fs.writeFileSync(batFilePath, batContent);

console.log("✅ Batch file created:", batFilePath);
};