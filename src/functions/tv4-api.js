import axios from 'axios';
import { mediaTypes } from '../shared.js'

const query = `
query ($input: FreeTextSearchInput!) {
    search(input: $input) {
      items {
        ... on Movie {
          id
          genres
          playableFrom {
            isoString
          }
          synopsis {
            brief
          }
          title
          productionYear
          productionCountries {
            name
          }
          isLiveContent
        }
        ... on Clip {
          id
          description
          playableFrom {
            isoString
          }
          images {
            main16x9 {
              source
            }
          }
        }
        ... on SportEvent {
          id
          country
          arena
          commentators
          league
          playableFrom {
            isoString
          }
          round
          season
          synopsis {
            brief
          }
          title
          productionYear
          isLiveContent
        }
        ... on Episode {
          id
          episodeNumber
          playableFrom {
            isoString
          }
          synopsis {
            brief
          }
          title
          seasonId
        }
        ... on Series {
          genres
          id
          synopsis {
            brief
          }
          title
          trailers {
            mp4
          }
        }
      }
    }
  }
`;

export const searchTv4Api = async (parameters) => {
  const variables = {
    input: parameters
  };

  const response = await axios.post(
    'https://client-gateway.tv4.dev1.a2d-dev.tv/graphql',
    {
      query: query,
      variables: variables,
    },
    {
      headers: {
        'client-name': 'gpt-tool',
        'client-version': '1.0.0',
      },
    }
  );

  return response.data;
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