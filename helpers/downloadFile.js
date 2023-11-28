const downloadFile = (data) => {
  if (data) {
    const jsonContent = JSON.stringify(data);
    const link = document.createElement("a");
    link.download = "my-publications.json";
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(
      jsonContent
    )}`;
    link.click();
  }
};

export default downloadFile;
