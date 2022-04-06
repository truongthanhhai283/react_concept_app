import { gql } from "apollo-boost";

export const GET_QUEUE_SONG = gql`
  query getQueuedSongs {
    queue @client {
      id
      duration
      title
      thumbnail
      artist
      url
    }
  }
`;
