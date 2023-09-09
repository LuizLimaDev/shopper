const knex = require("../services/conection")

const listProducts = async (req, res) => {
  const query = await knex('products')

  return res.status(200).json(query)
}

const updateProducts = async (req, res) => {
  const { products } = req.body

  try {
    products.map(async (item) => {

      const priceUptade = await knex('products')
        .update({ sales_price: item.new_price })
        .where({ code: item.code })

      const packUpdated = await knex('packs')
        .where('pack_id', item.code)
        .first()

      if (packUpdated) {
        const newPriceOfItemPack = item.new_price / packUpdated.qty

        const updatedItemOfPack = await knex('products')
          .update({ sales_price: newPriceOfItemPack.toFixed(2) })
          .where('code', packUpdated.product_id)
      }
    })

    products.map(async (item) => {
      const itemWithPack = await knex('packs')
        .where('product_id', item.code)
        .first()

      if (itemWithPack !== undefined) {
        const packItems = await knex.select('pack_id', 'product_id', 'qty')
          .from('packs')
          .where('pack_id', itemWithPack.pack_id)

        if (packItems.length === 1) {
          const newPackPrice = packItems[0].qty * item.new_price

          await knex('products')
            .update({ sales_price: newPackPrice.toFixed(2) })
            .where('code', packItems[0].pack_id)

          return
        }

        let itemsOfPack = []

        packItems.map(async product => {
          const searchPrices = await knex
            .select('*')
            .from('products')
            .where('code', product.product_id)
            .first()

          const totalItemsPackPrice = searchPrices.sales_price * product.qty
          itemsOfPack.push(totalItemsPackPrice)

          let newPackPrice = 0

          for (let item of itemsOfPack) {
            newPackPrice += item
          }

          await knex('products')
            .update({ sales_price: newPackPrice.toFixed(2) })
            .where('code', product.pack_id)
        })
      }
    })

    return res.status(204)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor!' })
  }
}

module.exports = {
  listProducts,
  updateProducts
}