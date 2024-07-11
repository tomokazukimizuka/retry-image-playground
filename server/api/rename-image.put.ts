import path from 'node:path';
import fs from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { dirPath, oldName, newName } = body;
  const config = useRuntimeConfig();

  const imageDirPath: string = (() => {
    switch (true) {
      case config.app.env === 'development' && dirPath.includes('assets'):
        // dev assets
        return path.resolve(process.cwd(), 'assets', 'images');
      case config.app.env !== 'development' && dirPath.includes('assets'):
        // prod assets
        return path.resolve(process.cwd(), '.output', 'public', 'assets');

      case config.app.env === 'development' && !dirPath.includes('assets'):
        // div public
        return path.resolve(process.cwd(), 'public');

      case config.app.env !== 'development' && !dirPath.includes('assets'):
        // prod public
        return path.resolve(process.cwd(), '.output', 'public');
      default:
        return '';
    }
  })();
  const oldPath: string = path.join(imageDirPath, oldName.replace(/\?.*$/, ''));

  if (!(await fileExists(oldPath))) return false;
  const newPath: string = path.join(imageDirPath, newName.replace(/\?.*$/, ''));
  await fs.rename(oldPath, newPath);
  return newPath;
});

async function fileExists(path: string): Promise<boolean> {
  try {
    return !!(await fs.lstat(path));
  } catch (e) {
    return false;
  }
}
