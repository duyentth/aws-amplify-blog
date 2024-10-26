import { cookieBasedClient } from "@/amplify-utils";
import * as queries from "@/src/graphql/queries";

export const getPosts = async () => {
  const { data } = await cookieBasedClient.graphql({
    query: queries.listPosts,
  });
  return data?.listPosts.items;
};
