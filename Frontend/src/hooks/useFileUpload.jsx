import { useContext } from "react";
import { UpdateFileContext } from "../context/updateFileContext";

export const useFileUpload = () => {
  const { setFileUploaded } = useContext(UpdateFileContext)

  function handleFileUpload(e) {
    let fileReader;
    const file = e.target.files[0]

    fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onload = function () {
      const fileData = fileReader.result
      setFileUploaded(fileData)
    }
  }

  return {
    handleFileUpload
  }
}