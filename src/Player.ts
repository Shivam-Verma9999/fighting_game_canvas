import { canvas } from ".";
import { Action } from "./Actions";
import { IDrawable } from "./Idrawable";
import { Iplayer } from "./IPlayer";
import { Iweapon } from "./Iweapon";
import { MovementDirection } from "./MovementDirection";

export class Player implements Iplayer {
    id: number;
    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public color: string;
    public lastAction: Action = undefined;
    public initialJumps: number = 2;
    public totalJumpsAvailable:number;
    public jumpPower: number = -6;
    public PlayerSpeed: number = 1;
    velocity: { x: number; y: number; } = {x:0,y:1};
    public weapon : Iweapon = null;


    constructor(id: number,speed:number =1, cords: IDrawable) {
        this.id = id;
        this.x = cords.x;
        this.y = cords.y;
        this.height = cords.height;
        this.width = cords.width;
        this.color = cords.color;
        this.totalJumpsAvailable = this.initialJumps; 
        this.PlayerSpeed = speed;
    }

    getDrawableCords(): IDrawable {
        return this;
    }
    
    setWeapon(weapon : Iweapon){
        this.weapon  = weapon;
    }

    getMovementDirection(): MovementDirection {
        if (
            this.lastAction === Action.MoveLeft 
        ) {
            return MovementDirection.Left;
        }else if(
            this.lastAction === Action.MoveRight
        ) {
            return MovementDirection.Right;
        }

    }
    directionMultiplier(): number {
        if( this.getMovementDirection() === MovementDirection.Left){
            return -1;
        }else {
            return 1;
        }
    }
    getWeaponForDraw() {
        let height = this.weapon.isActive ? this.weapon.width : this.weapon.height;
        let width = this.weapon.isActive ? this.weapon.height : this.weapon.width;
        return {
            color: this.weapon.color,
            x: (this.x  +this.width * this.directionMultiplier()),
            y:this.y,
            height: -height,
            width : width * this.directionMultiplier()
        }
    }
    updatePos() {
        // console.log(this.x + this.height + this.velocity.x);
        // console.log(this.y + this.width + this.velocity.y);
        let gravity: number = 0.2;
        this.velocity.y += gravity;
        if((this.x + this.width + this.velocity.x) >= canvas.width){
            this.velocity.x = 0
        };
        if((this.y + this.height + this.velocity.y) >= canvas.height-35){
            this.velocity.y = 0
            this.totalJumpsAvailable = this.initialJumps;
        };
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    activateWeapon() {
        this.weapon.isActive = true;
    }

    deactivateWeapon() {
        this.weapon.isActive = false;
    }
    jump() {
        if(this.totalJumpsAvailable == 0) return;

        this.velocity.y = this.jumpPower;
        this.totalJumpsAvailable--;
    }

    moveLeft() {
        this.velocity.x = -this.PlayerSpeed;
        this.lastAction = Action.MoveLeft;
    }

    moveRight(){
        this.velocity.x = this.PlayerSpeed;
        this.lastAction = Action.MoveRight;
    }
    stopLeftMovement(){
        if(this.getMovementDirection() === MovementDirection.Left){
            this.velocity.x = 0;
        }
    }

    stopRightMovement() {
        if(this.getMovementDirection() === MovementDirection.Right) {
            this.velocity.x = 0;
        }
    }
    attack(){
        this.activateWeapon();
    }
    stopAttack(){
        this.deactivateWeapon();
    }
}

