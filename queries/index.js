const merge = require('lodash/merge');
const { movies } = require('./movies');
const { tvs } = require('./tvs');
const { watchlists } = require('./watchlists');

const queries = merge(
    {},
    movies,
    tvs,
    watchlists
);

module.exports = { queries };
