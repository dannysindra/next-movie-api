// internal
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

const IMG_URL = 'https://image.tmdb.org/t/p/';

// common
const toGenres = genres => genres || [];

const toRuntime = runtime => runtime ? `${runtime} minutes` : 'N/A';

const toVote = vote => vote && vote > 0 ? `${vote} / 10` : 'N/A';

const toVoteCount = voteCount => voteCount ? voteCount : 'N/A';

const toProfileImgUrl = profilePath =>
    !profilePath
        ? ''
        : {
            small: `${IMG_URL}w45${profilePath}`,
            medium: `${IMG_URL}w185${profilePath}`,
            large: `${IMG_URL}h632${profilePath}`,
            original: `${IMG_URL}original${profilePath}`
        };

const toPosterImgUrl = posterPath =>
    !posterPath
        ? ''
        : {
            tiny: `${IMG_URL}w92${posterPath}`,
            smaller: `${IMG_URL}w154${posterPath}`,
            small: `${IMG_URL}w185${posterPath}`,
            medium: `${IMG_URL}w342${posterPath}`,
            large: `${IMG_URL}w500${posterPath}`,
            larger: `${IMG_URL}w780${posterPath}`,
            original: `${IMG_URL}original${posterPath}`
        };

const toBackdropImgUrl = backdropPath =>
    !backdropPath
        ? ''
        : {
            small: `${IMG_URL}w300${backdropPath}`,
            medium: `${IMG_URL}w780${backdropPath}`,
            large: `${IMG_URL}w1280${backdropPath}`,
            original: `${IMG_URL}original${backdropPath}`
        };

const toSimilar = processStrategy => similar =>
    !similar || !similar.results
        ? []
        : similar.results.map(result => processStrategy(result));

const toLocaleDate = date =>
    !date
        ? 'N/A'
        : new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
          });

const toLocaleShortDate = date =>
    !date
        ? 'N/A'
        : new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
          });

const toVideoUrl = videos => {
    if (!videos || !videos.results || videos.results.length === 0) {
        return null;
    }

    let video = videos.results[0]; // fallback, regardless of the video type

    for (let i = 0; i < videos.results.length; i++) {
        if (videos.results[i].type === 'Trailer') {
            video = videos.results[i];
            break;
        }
    }

    if (video.site === 'YouTube') {
        return `https://www.youtube.com/watch?v=${video.key}`;
    } else if (video.site === 'Vimeo') {
        return `https://vimeo.com/${video.key}`;
    }

    return '';
};

const toFeaturedCrew = credits => {
    if (!credits || !credits.crew || credits.crew.length === 0) {
        return [];
    }

    const featured = {
        Director: 0,
        Writer: 1,
        Story: 2,
        Screenplay: 3
    };

    const filtered = credits.crew
        .filter(person => featured[person.job] !== undefined)
        .reduce((res, person) => {
            return {
                ...res,
                [person.id]: {
                    ...person,
                    job: res[person.id]
                        ? `${res[person.id].job}, ${person.job}`
                        : person.job,
                    sortOrder: res[person.id]
                        ? featured[person.job] < res[person.id].sortOrder
                            ? featured[person.job]
                            : res[person.id].sortOrder
                        : featured[person.job]
                }
            };
        }, {});

    return Object.values(filtered)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(crew => ({
            creditId: crew.credit_id,
            id: crew.id,
            name: crew.name,
            department: crew.department,
            job: crew.job,
            profileImgUrl: toProfileImgUrl(crew.profile_path).medium
        }));
};

const toFeaturedCast = credits => {
    if (!credits || !credits.cast || credits.cast.length === 0) {
        return [];
    }

    return credits.cast.map(cast => ({
        creditId: cast.credit_id,
        castId: cast.cast_id,
        id: cast.id,
        name: cast.name,
        character: cast.character,
        order: cast.order,
        profileImgUrl: toProfileImgUrl(cast.profile_path).medium
    }));
};

const toReviews = reviews => {
    if (!reviews || !reviews.results || reviews.results.length === 0) {
        return [];
    }

    return reviews.results;
};

// movies
const toRevenue = revenue =>
    revenue && revenue > 0 ? currencyFormatter.format(revenue) : 'N/A';

// tv
const toTotalSeasons = seasons =>
    seasons ? `${seasons} season(s)` : 'N/A';

const toTotalEpisodes = episodes =>
    episodes ? `${episodes} episode(s)` : 'N/A';

// reducers
const movieReducer = (entity) => ({
    id: entity.id,
    title: entity.title,
    tagline: entity.tagline,
    overview: entity.overview,
    cast: toFeaturedCast(entity.credits),
    crew: toFeaturedCrew(entity.credits),
    reviews: toReviews(entity.reviews),
    similar: toSimilar(movieReducer)(entity.similar),
    genres: toGenres(entity.genres),
    runtime: toRuntime(entity.runtime),
    revenue: toRevenue(entity.revenue),
    releaseDate: toLocaleDate(entity.release_date),
    shortReleaseDate: toLocaleShortDate(entity.release_date),
    votes: toVote(entity.vote_average),
    posterImgUrl: toPosterImgUrl(entity.poster_path),
    backdropImgUrl: toBackdropImgUrl(entity.backdrop_path),
    videoUrl: toVideoUrl(entity.videos)
});

const tvReducer = (entity) => ({
    id: entity.id,
    name: entity.name,
    overview: entity.overview,
    cast: toFeaturedCast(entity.credits),
    crew: toFeaturedCrew(entity.credits),
    reviews: toReviews(entity.reviews),
    similar: toSimilar(tvReducer)(entity.similar),
    genres: toGenres(entity.genres),
    runtime: toRuntime(entity.episode_run_time),
    lastAirDate: toLocaleDate(entity.last_air_date),
    shortLastAirDate: toLocaleShortDate(entity.last_air_date),
    totalSeasons: toTotalSeasons(entity.number_of_seasons),
    totalEpisodes: toTotalEpisodes(entity.number_of_episodes),
    votes: toVote(entity.vote_average),
    posterImgUrl: toPosterImgUrl(entity.poster_path),
    backdropImgUrl: toBackdropImgUrl(entity.backdrop_path),
    videoUrl: toVideoUrl(entity.videos)
});

module.exports = {
    movieReducer,
    tvReducer
};
