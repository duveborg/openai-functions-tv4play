import axios from 'axios';

export const graphqlRequest = async (query, variables) => {  
    const response = await axios.post(
      'https://client-gateway.tv4.dev1.a2d-dev.tv/graphql',
      {
        query,
        variables,
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