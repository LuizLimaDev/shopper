const apiHealth = (req, res) => {

    res.status(200).json({
        menssage: `Server is running on port ${process.env.PORT}`
    })
};


module.exports = apiHealth