export class Role {
    id: string;
    rolename: string;
    rolecode: number;
    
    
    /**
     * Constructor
     *
     * @param role
     */
    constructor(role)
    {
        {
            this.id = role.id;
            this.rolename = role.rolename;
            this.rolecode = role.rolecode;            
        }
    }
}