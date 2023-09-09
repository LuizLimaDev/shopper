import { useContext } from "react";
import { toast } from 'react-toastify';
import api from "services/api.js";
import { UpdateFileContext } from "../../context/updateFileContext";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useValidation } from "../../hooks/useValidation";

export default function UpdateForm() {
  const {
    error,
    fileUploaded,
    setCSVFormated,
    validationStatus,
    validUpdate, setValidUpdate
  } = useContext(UpdateFileContext)
  const { handleFileUpload } = useFileUpload()
  const { handleValidation } = useValidation()

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', fileUploaded)

    try {
      await api.post('/updateproducts', { products: validationStatus })

      toast.success('Atualização realizada com sucesso!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      setCSVFormated('')
    } catch (error) {
      console.log(error)
    }

    setValidUpdate(false)
  }

  return (
    <div className='self-center justify-self-center'>
      <h1 className='text-center mt-10 mb-10 text-2xl font-bold'>
        Atualizar produtos
      </h1>

      <form className='flex flex-col items-center'>
        <div className='flex flex-col items-center relative'>
          <label className='mb-1' htmlFor="file">
            Selecione o arquivo de produtos
          </label>
          <input
            type="file"
            name="file"
            accept='.csv'
            onChange={handleFileUpload}
          />
        </div>

        {error &&
          <span className='mt-10 font-bold text-red-500 absolute top-[27%] translate-y-[50%]'>
            {error}
          </span>
        }

        <div className='flex gap-6 mt-24'>
          <button
            className='py-2 px-6 rounded font-bold bg-greenSP-200 text-gray-50'
            type='button'
            onClick={handleValidation}
          >
            Validar
          </button>
          <button
            className={`py-2 px-4 border-2 rounded border-greenSP-200 font-bold ${!validUpdate && 'border-slate-400 bg-slate-400'}`}
            type='submit'
            disabled={!validUpdate}
            onClick={handleSubmit}
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}