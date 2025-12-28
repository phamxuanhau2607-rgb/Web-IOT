/**
 * Script gộp mã nguồn dự án React/Vite (Phiên bản ES Module)
 * Chạy bằng lệnh: node merge-project.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CẤU HÌNH ---
const OUTPUT_FILE = 'FE.txt';

// Tái tạo __dirname vì ES Module không có sẵn biến này
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Các thư mục cần BỎ QUA
const IGNORE_DIRS = [
  'node_modules',
  'dist',
  'build',
  '.git',
  '.vscode',
  'coverage',
  'public'
];

// Các file cụ thể cần BỎ QUA
const IGNORE_FILES = [
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'README.md',
  '.gitignore',
  'merge-project.js', 
  OUTPUT_FILE
];

// Các đuôi file CHẤP NHẬN
const ALLOWED_EXTENSIONS = [
  '.ts', '.tsx',   
  '.js', '.jsx',   
  '.css', '.scss', 
  '.html',         
  '.json'          
];

// --- LOGIC XỬ LÝ ---

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    
    // Kiểm tra xem có phải thư mục không
    if (fs.statSync(fullPath).isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      // Logic lọc file: đúng đuôi VÀ không nằm trong danh sách loại trừ
      if (ALLOWED_EXTENSIONS.includes(ext) && !IGNORE_FILES.includes(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function mergeFiles() {
  try {
    const rootDir = __dirname;
    console.log('--- Đang quét file trong dự án (ESM Mode) ---');
    
    const allFiles = getAllFiles(rootDir);
    let outputContent = '';

    console.log(`> Tìm thấy ${allFiles.length} file quan trọng.`);

    allFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/'); // Chuẩn hóa đường dẫn
      
      outputContent += `${relativePath}\n===\n${content}\n===\n\n`;
    });

    fs.writeFileSync(path.join(rootDir, OUTPUT_FILE), outputContent, 'utf8');
    console.log(`> Hoàn tất! File đã được tạo tại: ${OUTPUT_FILE}`);
    
  } catch (err) {
    console.error('Có lỗi xảy ra:', err);
  }
}

mergeFiles();