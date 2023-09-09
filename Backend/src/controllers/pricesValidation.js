const knex = require("../services/conection")

const validatePrices = async (req, res) => {
  const { products } = req.body

  let validatedPrices = []

  for (const item of products) {
    try {
      const query = await knex('products')
        .where('code', item.code)
        .first()

      if (query && query.code) {
        let priceValidation = {
          code: query.code,
          sales_price: parseFloat(query.sales_price),
          cost_price: parseFloat(query.cost_price),
          new_price: parseFloat(item.sales_price),
          price_coast_check: null,
          percentage_readjustment_check: null
        }

        priceValidation.price_coast_check = priceValidation.cost_price < priceValidation.new_price
          ? 'Autorizado!'
          : 'Recusado! Preço abaixo do preço de custo atual.'

        const minPrice = query.sales_price * 0.9
        const maxPrice = query.sales_price * 1.1

        if (priceValidation.new_price < minPrice) {
          priceValidation.percentage_readjustment_check = 'Recusado! Preço ABAIXO dos 10%'
        }

        if (priceValidation.new_price > maxPrice) {
          priceValidation.percentage_readjustment_check = 'Recusado! Preço ACIMA dos 10%'
        }

        if (priceValidation.percentage_readjustment_check === null) {
          priceValidation.percentage_readjustment_check = 'Autorizado!'
        }

        validatedPrices.push(priceValidation)
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor!' })
    }
  }

  return res.status(200).json(validatedPrices)
}

module.exports = {
  validatePrices
}