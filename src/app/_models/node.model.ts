
export class Node {
    id: string;
    nodename: string;
    type: number;
    createdAt:string
    modifiedAt:string;
    
    
    /**
     * Constructor
     *
     * @param node
     */
    constructor(node)
    {
        {
            this.id = node.id;
            this.nodename = node.name;
            this.type = node.type;
            this.createdAt = node.createdAt;
            this.modifiedAt = node.modifiedAt;            
        }
    }
    
}