async function encodeToBase64(img) {
  //console.log("entro en encodeToBase64");
  //console.log(img);

  const fileReader = new FileReader();
  const result = await new Promise((resolve, reject) => {
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(img);
  });

  return result;
}

export default encodeToBase64;
