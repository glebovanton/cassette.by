import { GraphQLClient } from 'graphql-request';

export function request({ query, variables, preview }) {
  const endpoint = preview
    ? 'https://graphql.datocms.com/preview'
    : 'https://graphql.datocms.com/';
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.VUE_APP_CMS_DATOCMS_API_TOKEN.replace(/"/g, '')}`,
    },
  });
  return client.request(query, variables);
}
