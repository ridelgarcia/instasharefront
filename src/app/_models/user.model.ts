import { Role } from "./role.model";
export class User {
    id: string;
    name: string;
    lastname: String;
    email: string;
    token: string;
    role : Role;
    /**
     * Constructor
     *
     * @param user
     */
    constructor(user)
    {
        {
            this.id = user.id;
            this.name = user.name;
            this.lastname = user.lastname;
            this.email = user.email;
            this.token = user.token;
            this.role = user.role;
        }
    }
}
