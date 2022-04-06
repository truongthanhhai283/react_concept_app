import { gql } from "apollo-boost";

export const GET_SONGS = gql`
  subscription getSongs {
    table_songs(order_by: { create_at: asc }) {
      artist
      duration
      create_at
      id
      thumbnail
      title
      url
    }
  }
`;
