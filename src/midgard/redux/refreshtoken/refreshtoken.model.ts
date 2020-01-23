import { CoreUser } from '../coreuser/coreuser.model';
import { AccessToken } from '../accesstoken/accesstoken.model';

export interface RefreshToken {
	id?: string;
	user?: CoreUser;
	token?: string;
	access_token?: AccessToken;
	expires?: string;
	revoked?: string
}
