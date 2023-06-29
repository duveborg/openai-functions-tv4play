import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';
import { searchTv4Api, searchTv4ApiFunctionName, searchTv4ApiSchema } from './functions/search-tv4-api.js';
import { formatLinks, formatLinksFunctionName, formatsLinksSchema } from './functions/format-links.js'
import dotenv from 'dotenv'
import { fetchPopularPrograms, popularProgramsApiSchema, popularProgramsFunctionName } from './functions/popular-tv4-programs.js'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const functionSchemas = [
  formatsLinksSchema,
  searchTv4ApiSchema,
  popularProgramsApiSchema
];

const functions = {
  [searchTv4ApiFunctionName]: searchTv4Api,
  [formatLinksFunctionName]: formatLinks,
  [popularProgramsFunctionName]: fetchPopularPrograms
};

rl.question('Search the tv4play graphql API for: ', async (question) => {
  try {
    const messages = [
      {
        role: 'user',
        content: question,
      },
    ];

    const getCompletion = async (messages) => {
      try {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo-0613',
          messages,
          functions: functionSchemas,
          temperature: 0.8, // Temp = 0 will only show a raw output, and the closer to 2 it will add more words to the response
        });

        return response;
      } catch (error) {
        console.error('Error during completion: ', error.response.data);
      }
    };

    let response;
    while (true) {
      response = await getCompletion(messages);
      const { finish_reason, message } = response.data.choices[0];

      if (finish_reason === 'stop') {
        console.log(message.content);
        break;
      } else if (finish_reason === 'function_call') {
        const { name: fnName, arguments: args } = message.function_call;

        const fn = functions[fnName];
        const parsedArgs = JSON.parse(args);

        console.log('Function call: ', fnName, parsedArgs);
        const result = await fn(parsedArgs);

        messages.push({
          role: 'assistant',
          content: null,
          function_call: {
            name: fnName,
            arguments: args,
          },
        });

        messages.push({
          role: 'function',
          name: fnName,
          content: JSON.stringify({ result: result }),
        });
      }
    }
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    rl.close();
  }
});
