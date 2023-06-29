
import { movieFields, seriesFields } from '../gql-fields.js'
import { graphqlRequest } from '../gql-request.js'

const query = `
query ($input: PopularMediaInput!) {
  popularMedia(input: $input) {
    items {
      ... on PopularMediaSeriesItem {
        series {
          ${seriesFields}
        }
      }
      ... on PopularMediaMovieItem {
        movie {
          ${movieFields}
        }
      }
    }
  }
}
`;

export const fetchPopularPrograms = async (parameters) => {
  const variables = {
    input: parameters
  };

  return graphqlRequest(query, variables)
};

export const popularProgramsFunctionName = 'popular_tv4_programs'

export const popularProgramsApiSchema = {
  name: popularProgramsFunctionName,
  description:
    'Fetch popular programs from tv4play api',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        minimum: 0,
        maximum: 100,
        description: 'Number of results to return',
      },
      offset: {
        type: 'number',
        minimum: 0,
        maximum: 10000,
        description: 'Offset in search results',
      },
    },
    required: ['limit', 'offset'],
  },
}