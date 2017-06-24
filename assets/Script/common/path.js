module.exports = {

    resolve: (fullPath) => {
        let currPath = cc.url.raw('resources');
        return fullPath.sub(currPath.length);
    },

    join: () => {
        return cc.path.join.apply(null, arguments);
    }
}