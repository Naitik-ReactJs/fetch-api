import React, { useState } from "react";

const Base64 = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [textValue, setTextValue] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files);
    console.log(e.target.files[0].type);
  };

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        setTextValue(Base64);
      };
    }
  };

  return (
    <div className="container text-center">
      <div className="text-center bg-danger p-4 fs-3">Upload file/image</div>
      <br />
      <input type="file" id="input" className="mb-4" onChange={onFileChange} />
      <br />
      <textarea
        rows={10}
        cols={30}
        readOnly={true}
        value={textValue}
        onChange={encodeFileBase64(selectedFile[0])}
      />
    </div>
  );
};

export default Base64;
