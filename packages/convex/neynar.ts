import type { User as NeynarUser } from "@neynar/nodejs-sdk/build/api/index.js";
import { Configuration, NeynarAPIClient } from "@neynar/nodejs-sdk";

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY!,
});

const neynarClient = new NeynarAPIClient(config);

/**
 * Fetch multiple users from Neynar
 * @param fids - comma separated FIDs of the users to fetch
 * @returns The users
 */
export const fetchBulkUsersFromNeynar = async (
  fids: number[],
  viewerFid?: number,
): Promise<NeynarUser[]> => {
  if (!fids) {
    return [];
  }

  const data = await neynarClient.fetchBulkUsers({
    fids,
    viewerFid,
  });

  return data.users || [];
};

/**
 * Fetch a single user from Neynar
 * @param fid - The FID of the user to fetch
 * @returns The user
 */
export const fetchUserFromNeynarByFid = async (
  fid: number,
): Promise<NeynarUser | null> => {
  if (!fid) {
    return null;
  }
  const users = await fetchBulkUsersFromNeynar([fid]);
  if (!users || users.length === 0) {
    return null;
  }
  return users[0];
};

/**
 * Search for users by username
 * @param username - The username to search for
 * @param viewerFid - The FID of the viewer
 * @returns The users
 */
export const searchUserByUsername = async (
  username: string,
  viewerFid?: number,
): Promise<NeynarUser | null> => {
  const data = await neynarClient.searchUser({
    q: username,
    limit: 1,
    viewerFid,
  });

  if (!data.result?.users) {
    return null;
  }
  const users = data.result.users.map((user) => ({
    ...user,
    pfp_url: user.pfp_url ? formatAvatarSrc(user.pfp_url) : "",
  }));
  return users[0];
};

/**
 * Format the avatar src for imagedelivery.net images to reasonable avatar sizes
 *
 * @docs https://developers.cloudflare.com/images/transform-images/transform-via-url/#options
 *
 * @param avatarSrc - The src of the avatar
 * @returns The formatted avatar src
 */
export const formatAvatarSrc = (url: string) => {
  let avatarSrc = url;
  if (avatarSrc.startsWith("https://imagedelivery.net")) {
    const defaultAvatar = "/anim=false,fit=contain,f=auto,w=512";
    if (avatarSrc.endsWith("/rectcrop3")) {
      avatarSrc = avatarSrc.replace("/rectcrop3", defaultAvatar);
    } else if (avatarSrc.endsWith("/original")) {
      avatarSrc = avatarSrc.replace("/original", defaultAvatar);
    } else if (avatarSrc.endsWith("/public")) {
      avatarSrc = avatarSrc.replace("/public", defaultAvatar);
    }
  }
  return avatarSrc;
};
