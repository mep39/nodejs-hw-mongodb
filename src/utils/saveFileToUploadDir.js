import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
// import { env } from './env.js';

// export const saveFileToUploadDir = async (file) => {
//   await fs.rename(
//     path.join(TEMP_UPLOAD_DIR, file.filename),
//     path.join(UPLOAD_DIR, file.filename),
//   );

//   return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
// };
const saveFileToUploadDir = async file => {
  const oldPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const newPath = path.join(UPLOAD_DIR, file.filename);

  await fs.rename(oldPath, newPath);

  return file.filename;
};

export default saveFileToUploadDir;