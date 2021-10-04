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

export const customUpload = async ({ onError, onSuccess, file }: any) => {
  const storageRef = await storage.ref();
  const metadata = {
    contentType: file.type,
  };

  const imageName = `${new Date().getTime()}-${file.name}`; //a unique name for the image
  const imgFile = storageRef.child(`admin/user-images/${imageName}`);
  try {
    const image = imgFile.put(file, metadata);
    image.on('state_changed', async () => {
      const imageUrl = await image.snapshot.ref.getDownloadURL();
      file.imageUrl = imageUrl;
      onSuccess(null, file);
    });
  } catch (e) {
    onError(e);
  }
};
