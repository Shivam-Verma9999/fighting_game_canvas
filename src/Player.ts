import { canvas } from ".";
import { IDrawable } from "./Idrawable";
import { Iplayer } from "./IPlayer";
import { Iweapon } from "./Iweapon";

export class Player implements Iplayer {
    id: number;
    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public color: string;
    public lastKey: string = "";
    public initialJumps: number = 2;
    public totalJumpsAvailable:number;
    public jumpPower: number = -5;
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

    getWeaponForDraw() {
        let height = this.weapon.isActive ? this.weapon.width : this.weapon.height;
        let width = this.weapon.isActive ? this.weapon.height : this.weapon.width;
        return {
            color: this.weapon.color,
            x: (this.x  +this.width),
            y:this.y,
            height: -height,
            width : width
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
        if((this.y + this.height + this.velocity.y) >= canvas.height){
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
}

