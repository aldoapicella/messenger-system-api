/**
 * Represents the response object returned when authenticating a user.
 */
export interface IAuthResponse {
    /**
     * The access token to be used for authenticating requests.
     */
    accessToken: string;
    /**
     * The refresh token to be used for refreshing the access token.
     */
    refreshToken: string;
}