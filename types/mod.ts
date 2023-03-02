/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

export type TRet = any;
export type TObject = Record<TRet, TRet>;

export type TPartialCloudflareZone = {
  id: string,
  name: string,
  status: string
}

export type TPartialRoundcubeUser = {
  email: string,
  status: string
}

export type TRoundcubeUsers = {
  domain: string,
  users: TRoundcubeUser
}

export enum Color {
  TEXT_COLOR = "\x1b[38;2;160;129;226m",
  SUCCESS = "\x1b[38;2;159;234;121m",
  WARN = "\x1b[38;2;242;223;104m",
  ERROR = "\x1b[38;2;242;106;104m",
  RESET = "\x1b[0m"
}