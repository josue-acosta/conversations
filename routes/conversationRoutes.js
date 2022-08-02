module.exports = app => {
        app.get('/api/lorem-ipsum', (req, res) => {
        res.status(200).json({ message: "POST /api/conversation"  })
    })
}