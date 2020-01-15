const { Tvs } = require('../models');

const tvs = {
    Query: {
        tv: (_, { id }, context) => Tvs.getTvById(context, id),
        popularTvs: (_, __, context) => Tvs.getPopularTvs(context)
    }
};

module.exports = { tvs };
