import { storage } from '../../services/firebase';

export const beforeUpload = (file: any) => {
  const isImage = file.type.indexOf('image/') === 0;
  if (!isImage) {
    console.log('You can only upload image file!');
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    console.log('Image must smaller than 5MB!');
  }
  return isImage && isLt5M;
};

export const onPreview = async (file: any) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  if (imgWindow) {
    imgWindow.document.write(image.outerHTML);
  }
};
