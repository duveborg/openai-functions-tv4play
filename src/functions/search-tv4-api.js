
import { mediaTypes } from '../shared.js'
import { movieFields, clipFields,sportEventFields, episodeFields, seriesFields } from '../gql-fields.js'
import { graphqlRequest } from '../gql-request.js'

const query = `
query ($input: FreeTextSearchInput!) {
    search(input: $input) {
      items {
        ... on Movie {
          ${movieFields}
        }
        ... on Clip {
          ${clipFields}
        }
        ... on SportEvent {
          ${sportEventFields}
        }
        ... on Episode {
          ${episodeFields}
        }
        ... on Series {
          ${seriesFields}
        }
      }
    }
  }
`;

export const searchTv4Api = async (parameters) => {
  const variables = {
    input: parameters
  };

  return graphqlRequest(query, variables)
};

export const searchTv4ApiFunctionName = 'search_tv4_api'

export const searchTv4ApiSchema = {
  name: searchTv4ApiFunctionName,
  description:
    'Used to search the tv4play api for different types of content',
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
        maximum: 100,
        description: 'Offset in search results',
      },
      query: {
        minLength: 2,
        type: 'string',
        description: 'A text to search for',
      },
      types: {
        type: 'array',
        items: {
          type: 'string',
          enum: mediaTypes,
        },
        description: 'The type of content to search for',
      },
    },
    required: ['query', 'offset', 'limit', 'types'],
  },
}