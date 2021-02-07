const IMAGE_URL = `${process.env.REACT_APP_SOCKET_SERVER_URL}/test256.png`;
const IMAGE_SIZE_BITS = 141978 * 8;

const getSpeedBits = (
  imageSize: number,
  startTime: number,
  endTime: number,
): number => {
  const duration = (endTime - startTime) / 1000;
  if (duration > 0) {
    return imageSize / duration;
  }
  return 0;
};

const processImage = (): Promise<number> => {
  return new Promise((resolve) => {
    const image = new Image();
    let endTime: number;
    image.onload = () => {
      endTime = new Date().getTime();
      const speed = getSpeedBits(IMAGE_SIZE_BITS, startTime, endTime);
      resolve(speed);
    };

    image.onerror = () => {
      resolve(-1);
    };

    const startTime = new Date().getTime();
    image.src = `${IMAGE_URL}?t=${startTime}`;
  });
};
export const getNetworkSpeed = async (): Promise<number> => {
  return await processImage();
};