
export class Node {
    id: string;
    nodename: string;
    type: number;
    createdAt:Date
    modifiedAt:Date;
    
    
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
            this.createdAt = new Date(1000*(node.createdAt));
            this.modifiedAt = new Date(1000*(node.modifiedAt));            
        }
    }
    
}