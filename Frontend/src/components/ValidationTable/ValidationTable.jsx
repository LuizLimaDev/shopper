import { useContext } from "react"
import { UpdateFileContext } from "../../context/updateFileContext"

export default function ValidationTable() {
  const { CSVFormated, validationStatus } = useContext(UpdateFileContext)

  return (
    <div>
      <h1
        className='text-center py-4 mt-10 text-xl font-bold bg-slate-100 border-b'
      >
        Validação
      </h1>

      <div className='flex gap-8 py-2 pl-2 font-bold bg-slate-100'>
        <h1>Código</h1>
        <h1>Preço atual</h1>
        <h1 className="text-red-500">Novo preço</h1>
        <h1 className='w-96'>
          Status
        </h1>
      </div>

      {CSVFormated && (
        validationStatus.map(row => (
          <div
            key={row.code}
            className='flex items-center gap-8 pl-2 odd:bg-white even:bg-slate-100'
          >
            <h3 className='w-14'>
              {row.code}
            </h3>
            <p className='w-20'>
              {row.sales_price}
            </p>
            <p className='w-20 ml-1 text-red-500'>
              {row.new_price}
            </p>
            <div className='flex flex-col ml-2'>
              <p className='text-red-500'>
                {row.price_coast_check !== 'Autorizado!' && row.price_coast_check}
              </p>
              <p className='text-red-500'>
                {row.percentage_readjustment_check !== 'Autorizado!' && row.percentage_readjustment_check}
              </p>
              <p className='text-green-500'>
                {
                  row.price_coast_check && row.percentage_readjustment_check === 'Autorizado!'
                  && 'Autorizado para atualização!'
                }
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}