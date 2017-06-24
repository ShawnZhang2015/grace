module.exports = {
    readFile(path, cb) {
        let str = jsb.fileUtils.getStringFromFile(path);
        cb(null, str);  
    },

    readFileSync(path) {
        return jsb.fileUtils.getStringFromFile(path);
    }
}