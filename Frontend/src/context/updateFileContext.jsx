import { createContext, useState } from "react";

export const UpdateFileContext = createContext()

export const UpdateFileProvider = ({ children }) => {
  const [error, setError] = useState('')
  const [fileUploaded, setFileUploaded] = useState([])
  const [CSVFormated, setCSVFormated] = useState([])
  const [validationStatus, setValidationStatus] = useState([])
  const [validUpdate, setValidUpdate] = useState(false)

  return (
    <UpdateFileContext.Provider value={{
      error, setError,
      fileUploaded, setFileUploaded,
      CSVFormated, setCSVFormated,
      validationStatus, setValidationStatus,
      validUpdate, setValidUpdate
    }}>
      {children}
    </UpdateFileContext.Provider>
  )
}