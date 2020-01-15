const { tvReducer } = require('./utils');

const Tvs = {
    getTvById: async ({dataSources}, id) => {
        const opts = {append_to_response: 'credits,reviews,similar,videos'};
        const result = await dataSources.TmdbAPI.getTvById(id, opts);
        return tvReducer(result);
    },

    getPopularTvs: async ({dataSources}) => {
        const opts = {region: 'US'};
        const result = await dataSources.TmdbAPI.getPopularTvs(opts);
        return result.results.map(tvReducer); // return just the 1st page
    }
};

module.exports = { Tvs };
