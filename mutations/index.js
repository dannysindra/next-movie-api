const merge = require('lodash/merge');
const { watchlists } = require('./watchlists');

const mutations = merge(
    {},
    watchlists
);

module.exports = { mutations };
