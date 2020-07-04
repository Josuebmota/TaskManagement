import path from 'path';
import fs from 'fs';

export default async function deleteImage(req, file) {
  if (req.file !== undefined) {
    const image = file === undefined ? req.file.filename : file;
    await fs.unlinkSync(
      path.resolve(__dirname, '..', '..', '..', 'uploads', `${image}`)
    );
  } else if (file) {
    await fs.unlinkSync(
      path.resolve(__dirname, '..', '..', '..', 'uploads', `${file}`)
    );
  }
}
