import React, { useCallback, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { message, Modal } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const ImageUpload = ({ name, control, defaultValue, ...props }) => {
  const {
    field: { value, onChange },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ? [{ preview: defaultValue }] : [],
  });
  const [preview, setPreview] = useState(value[0] ? value[0].preview : null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = useCallback(() => {
    setPreviewVisible(true);
  }, []);

  useEffect(() => {
    if (value[0]) {
      setPreview(value[0].preview);
    }
  }, [value]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) {
      return;
    }

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/gif"
    ) {
      message.error("Chỉ có ảnh PNG, GIF, JPEG và JPG mới được phép tải lên.");
      return;
    }

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    onChange([newFile]);
    setPreview(newFile.preview);
    message.success("Tải ảnh lên thành công!");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/png, image/jpeg, image/jpg,  image/gif",
  });

  return (
    <div className="flex flex-col gap-4 mt-4 relative">
      <div
        {...getRootProps()}
        className={` h-[300px] flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg p-4 ${
          props.errors ? "border-red-500" : ""
        }`}
      >
        <input {...getInputProps()} id={name} {...props} />
        {isDragActive ? (
          <p>Thả ảnh vào đây...</p>
        ) : (
          <p>Chọn ảnh hoặc kéo và thả vào đây</p>
        )}
      </div>
      {preview && (
        <div className="flex flex-col absolute w-full h-full">
          <div className="w-full h-[300px] relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5">
              <Tooltip title="Xóa">
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
                  onClick={() => {
                    onChange([]);
                    setPreview(null);
                  }}
                >
                  <DeleteOutlined />
                </button>
              </Tooltip>
              <Tooltip title="Xem ảnh">
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 "
                  onClick={handlePreview}
                >
                  <EyeOutlined />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={preview} />
      </Modal>
    </div>
  );
};

export default ImageUpload;
