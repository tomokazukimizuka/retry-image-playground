export const useRetry = (image: string) => {
  const srcImage: Ref<string> = ref(image);
  const currentSrc: Ref<string> = ref('');

  const hash: ComputedRef<string> = computed(() => {
    // publicはhashなし
    if (!dirPath.includes('assets')) return '';
    const pathArray: string[] = currentSrc.value.split('/');
    const fullFileName: string = pathArray.pop() || '';
    return fullFileName.split('.')[1];
  });

  const separatePath = (image: string) => {
    const pathArray: string[] = image.split('/');
    const fileName: string = (pathArray.pop() || '').split('.')[0];
    const dirPath: string = pathArray.join('/');
    const extension: string = '.' + image.split('.').pop();
    const fullFileName: string = fileName + extension;
    return { dirPath, fileName, extension, fullFileName };
  };
  const { dirPath, fileName, extension, fullFileName } = separatePath(image);

  // 存在しないパスを指定してリトライを発生させて5秒間後に元々のパスに戻す
  const retryMissingPath = () => {
    srcImage.value = _missingPath;
    setTimeout(() => {
      srcImage.value = image;
      attempts.value = 1;
    }, 5000);
  };

  const retryRename = async () => {
    if (import.meta.env.MODE === 'development' || !hash.value) {
      await _renameImage(fullFileName, _missingFullFileName);
    } else {
      await _renameImage(`${fileName}.${hash.value}${extension}`, `${fileName}.${hash.value}-missing${extension}`);
    }
    window.location.reload();
  };

  const restoreRename = async () => {
    if (import.meta.env.MODE === 'development' || !hash.value) {
      await _renameImage(_missingFullFileName, fullFileName);
    } else {
      await _renameImage(`${fileName}.${hash.value}-missing${extension}`, `${fileName}.${hash.value}${extension}`);
    }
  };

  const _missingPath: string = `${dirPath}/${fileName}-missing${extension}`;
  const _missingFullFileName: string = `${fileName}-missing${extension}`;

  const _renameImage = async (oldName: string, newName: string): Promise<string> => {
    const { data } = await useFetch('/api/rename-image', { method: 'put', body: { dirPath, oldName, newName } });
    return data.value as string;
  };

  const isRetrying: Ref<boolean> = ref(false);
  const attempts: Ref<number> = ref(1);

  return {
    srcImage,
    currentSrc,
    retryMissingPath,
    retryRename,
    restoreRename,
    isRetrying,
    attempts
  };
};
