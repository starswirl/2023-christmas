import useImage from "use-image";

export const MyImage = (url: string) => {
  const [image] = useImage(url);
  return image;
};
