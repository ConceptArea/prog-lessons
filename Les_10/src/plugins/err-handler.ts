function errHandler(res) {
    return function (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export {
    errHandler
}