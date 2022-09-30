import { Action } from "./Actions";
import { Player } from "./Player";

export class Controller {
    private player: Player = undefined;
    
    constructor(player: Player) {
        this.registerPlayer(player);
    }

    public registerPlayer(player: Player) {
        this.player = player;
    }

    public doAction(action: Action) {
        switch(action) {
            case Action.MoveLeft:
                this.player.moveLeft();
                break;
            
            case Action.MoveRight:
                this.player.moveRight();
                break;
            
            case Action.Jump:
                this.player.jump();
                break;

            case Action.Attack:
                this.player.attack();
                break;

            case Action.StopAttack:
                this.player.stopAttack();

            case Action.StopMoveLeft:
            case Action.StopMoveRight:
                this.player.stopMovement();
                break;
            
            default:
                console.log(`Un-implemented action: ${action}`);
                break;
            
        }
    }
}