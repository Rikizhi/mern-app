import React from 'react';

const FilePreviews = ({ file }) => {
  console.log("File URL:", file.url);
  let content = null;

  const previewFile = () => {
    if (file.url.startsWith('https://firebasestorage.googleapis.com')) {
      // Jika file berasal dari Firebase, gunakan langsung URL dari Firebase
      if (file.type.startsWith('image/')) {
        content = <img src={file.url} alt={file.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
      } else if (file.type === 'application/pdf') {
        content = (
          <embed
            src={file.url}
            type="application/pdf"
            width="100%"
            height="500px"
          />
        );
      } else {
        content = <p>Pratinjau tidak tersedia untuk tipe file ini.</p>;
      }
    } else {
      // Jika file masih tersedia secara lokal, gunakan URL.createObjectURL
      if (file.type.startsWith('image/')) {
        content = <img src={URL.createObjectURL(file.file)} alt={file.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
      } else if (file.type === 'application/pdf') {
        content = (
          <embed
            src={URL.createObjectURL(file.file)}
            type="application/pdf"
            width="100%"
            height="500px"
          />
        );
      } else {
        content = <p>Pratinjau tidak tersedia untuk tipe file ini.</p>;
      }
    }
  };

  previewFile();

  return (
    <div>
      {content}
    </div>
  );
};

export default FilePreviews;
