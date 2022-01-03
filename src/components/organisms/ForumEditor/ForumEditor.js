import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import classNames from "classnames";
import styles from "./ForumEditor.scss";
import { Form } from "react-bootstrap";
import Button from "../../atoms/Button";
import Box from "../../atoms/Box";
import { InputGroup, FormControl } from "react-bootstrap";

const cx = classNames.bind(styles);

function ForumEditor({
  articleData,
  editorRef,
  uploadImage,
  onSubmit,
  onChangeTitle,
  className,
}) {
  return (
    <Form className={cx("forum-editor-form", className)} onSubmit={onSubmit}>
      <InputGroup className={cx("editor-input-group")}>
        <InputGroup.Text>제목</InputGroup.Text>
        <FormControl
          plcaeholder="제목"
          onChange={onChangeTitle}
          value={articleData.title}
        />
      </InputGroup>
      <Box className={cx("forum-editor")}>
        <Editor
          ref={editorRef}
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommendShortcut={true}
          usageStatics={false}
          placeholder="자유롭게 글 쓰세요!"
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const imgUrl = await uploadImage(blob);
              callback(imgUrl, "alt text");
              return false;
            },
          }}
        />
      </Box>
      <Button type="submit" className={cx("forum-submit-btn")}>
        제출
      </Button>
    </Form>
  );
}

export default ForumEditor;
