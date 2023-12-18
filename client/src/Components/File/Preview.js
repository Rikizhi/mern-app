import React from "react";

const Preview = ({ name, fileURL, fileType }) => {
  let content = null;

  const previewFile = () => {
    if (fileType) {
      // Periksa keberadaan fileType sebelum menggunakannya
      if (fileURL.startsWith("https://firebasestorage.googleapis.com")) {
        if (fileType.startsWith("document/")) {
          content = <embed src={fileURL} alt={name} style={{ maxWidth: "100%", maxHeight: "100%" }} />;
        } else if (fileType === "application/pdf") {
          content = <embed src={fileURL} type="application/pdf" width="100%" height="500px" />;
        } else {
          content = <p>Pratinjau tidak tersedia untuk tipe file ini.</p>;
        }
      } else {
        // Kode jika file tersedia secara lokal
        if (fileType.startsWith("document/")) {
          content = <embed src={URL.createObjectURL(fileURL)} alt={name} style={{ maxWidth: "100%", maxHeight: "100%" }} />;
        } else if (fileType === "application/pdf") {
          content = <embed src={URL.createObjectURL(fileURL)} type="application/pdf" width="100%" height="500px" />;
        } else {
          content = <p>Pratinjau tidak tersedia untuk tipe file ini.</p>;
        }
      }
    } else {
      content = <p>Tipe file tidak dikenal.</p>;
    }
  };

  previewFile();

  return <div>{content}</div>;
};

export default Preview;
