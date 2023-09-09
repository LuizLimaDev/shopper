import { useContext } from "react";
import { UpdateFileContext } from "../context/updateFileContext";
import api from 'services/api.js'

export const useValidation = () => {
  const {
    setError,
    fileUploaded,
    setCSVFormated,
    setValidationStatus,
    setValidUpdate
  } = useContext(UpdateFileContext)

  async function handleValidation() {
    setCSVFormated('')
    setError('')
    setValidUpdate(false)
    const result = []

    if (fileUploaded.length === 0) return setError('Selecione um arquivo por favor!')

    const [header, ...content] = fileUploaded.split("\n")

    content.forEach(row => {
      const editedRow = row.split(",")

      result.push({
        code: editedRow[0],
        sales_price: editedRow[1]
      })
    })

    if (result[0].sales_price === undefined) {
      setError('O arquivo deve conter ao menos um preço para atualizar!')
      return
    }

    setCSVFormated(result)

    try {
      setValidationStatus([])
      const { data } = await api.post('/validate', { products: result })

      setValidationStatus(data)

      if (data) {
        for (const item of data) {
          if (item.percentage_readjustment_check && item.price_coast_check !== "Autorizado!") {
            setValidUpdate(false)
            return
          }
        }

        setValidUpdate(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleValidation
  }
}