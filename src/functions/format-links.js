import { mediaTypes } from '../shared.js';

export const formatLinksFunctionName = 'format_link_to_tv4play';

export const formatsLinksSchema = {
  name: formatLinksFunctionName,
  description: 'Formats a link to the tv4play website with an ID and media type',
  parameters: {
    type: 'object',
    properties: {
      createLinksFor: {
        description: "A list of id's and media types to create links for",
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The id to link to',
            },
            mediaType: {
              type: 'string',
              enum: mediaTypes,
              description: 'The type of media to create a link for',
            },
          },
          required: ['id', 'mediaType'],
        },
      },
    },
  },
};

const formatLink = (type, id) => `https://www.tv4play.se/${type}/${id}`;

export const formatLinks = ({ createLinksFor }) =>
  createLinksFor.map(({ id, mediaType }) => {
    switch (mediaType) {
      case 'CLIP':
        return formatLink('klipp', id);
      case 'EPISODE':
        return formatLink('video', id);
      case 'MOVIE':
      case 'SERIES':
      case 'SPORT_EVENT':
        return formatLink('program', id);
    }
  });
