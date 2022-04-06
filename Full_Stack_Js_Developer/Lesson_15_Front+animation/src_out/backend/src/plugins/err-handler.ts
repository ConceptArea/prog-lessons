function errHandler(res) {
    return function (err) {
        console.error(err);
        res.sendStatus(404);
    }
}

export {
    errHandler}
