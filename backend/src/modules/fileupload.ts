import * as multer from 'multer';
import * as path from 'path';
import { mkdirSync } from 'fs';
import { Request } from 'express';

const createFolderWithDate = (folder: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const relativePath = path.join(
    'uploads',
    folder,
    `${year}`,
    `${month}`,
    `${day}`
  );
  const absolutePath = path.join(__dirname, '..', '..', 'public', relativePath);

  mkdirSync(absolutePath, { recursive: true });

  return { relativePath, absolutePath };
};

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const folder = req.url.includes('product') ? 'product' : 'other';
    const { relativePath, absolutePath } = createFolderWithDate(folder);

    (file as any).relativeUploadPath = relativePath;
    cb(null, absolutePath);
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}${ext}`;
    const dbPath = path
      .join((file as any).relativeUploadPath, filename)
      .replace(/\\/g, '/');

    (file as any).dbPath = '/' + dbPath;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
