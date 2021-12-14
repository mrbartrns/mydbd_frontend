import React, { useState, useCallback, useRef } from "react";
import userService from "../services/user.service";

function TestTemplate(props) {
  const [images, setImages] = useState([]);
  const imgInput = useRef();
  const onImgInputBtnClick = useCallback((e) => {
    e.preventDefault();
    imgInput.current.click();
  }, []);
  const onChange = useCallback((e) => {
    console.log(e.target.files[0]);
    setImages((prev) => {
      return [e.target.files[0]];
    });
  }, []);
  const onSubmit = useCallback(async (e, data) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", data[0]);
      const response = await userService.test(formData);
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
      console.error(error);
    }
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e, images);
        }}
      >
        <input
          type="file"
          multiple
          onChange={onChange}
          accept="image/*"
          className="img_input"
          ref={imgInput}
          style={{ display: "none" }}
        />
        <input type="button" value="업로드.." onClick={onImgInputBtnClick} />
        <input type="submit" value="제출" />
      </form>
      <div>
        {images.map((img, idx) => {
          return <div key={idx}>{img.name}</div>;
        })}
      </div>
    </div>
  );
}

export default TestTemplate;
