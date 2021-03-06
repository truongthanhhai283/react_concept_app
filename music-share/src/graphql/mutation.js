import { gql } from "apollo-boost";

export const ADD_SONG = gql`
  mutation addSong(
    $title: String!
    $artist: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_table_songs(
      objects: {
        thumbnail: $thumbnail
        title: $title
        duration: $duration
        artist: $artist
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_OR_REMOVE_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input: $input) @client
  }
`;
