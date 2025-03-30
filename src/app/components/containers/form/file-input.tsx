import { Input } from "@/components/ui";
import { type ChangeEvent } from "react";

function getFileData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((file) =>
    dataTransfer.items.add(file),
  );
  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
}

export const FileInputField = ({ ...props }) => {
  return (
    <>
      <Input
        type="file"
        {...props.rest}
        onChange={(event) => {
          const { files } = getFileData(event)
          props.onChange(files);
        }}
      />
    </>
  )
}
