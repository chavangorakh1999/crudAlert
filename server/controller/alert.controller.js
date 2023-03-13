module.exports={
    alertMessage(req,res){
        const message = req.body.message;
        global.io.emit('message', message);
        res.json({ message: 'Message broadcasted successfully.' });
    }
}