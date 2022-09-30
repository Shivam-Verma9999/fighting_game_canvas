export class KeyControllerMap {

    private static _map : Map<string,number> = new Map();
    private static _initialized : boolean = false;     

    static initialize(){
        this.mapKeyControllerID("a",1);
        this.mapKeyControllerID("s",1);
        this.mapKeyControllerID("d",1);
        this.mapKeyControllerID("w",1);
        this.mapKeyControllerID("arrowup",2);
        this.mapKeyControllerID("arrowdown",2);
        this.mapKeyControllerID("arrowleft",2);
        this.mapKeyControllerID("arrowright",2);
        this.mapKeyControllerID(" ", 1);
        this._initialized = true;
    }
    public static getMappedControllerID(key: string): number
    {   
        this.throwIfNotInitialized();
        let controllerId = this._map.get(key);
        return (controllerId === undefined) ? -1: controllerId;

    }

    public static mapKeyControllerID(key:string, controllerID: number){
        this._map.set(key,controllerID)
    }

    public static throwIfNotInitialized() {
        if( !this._initialized ) throw new Error("KeyMapperNotInitialized");
        
    }
    public static unMapKeyControllerID(key: string){
        this.throwIfNotInitialized();
        this._map.delete(key);
    }
};
