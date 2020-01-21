import { CoreUser } from '../coreuser/coreuser.model';

export interface AccessToken {
	id?: string;
	user?: CoreUser;
	token?: string;
	expires: string;
}
