import { IDrawable } from "./Idrawable";
import { Iweapon } from "./Iweapon";
import { Player } from "./Player";

export class Sword implements Iweapon {
    damage: number;
    isActive: boolean;
    x: number;
    y: number;
    height: number;
    width: number;
    color: string;

    public constructor(drawInfo: IDrawable = {
        x: 0,
        y: 0,
        height: 30,
        width: 5,
        color: "yellow"
    }, damage: number = 10 ){
        this.color = drawInfo.color
        this.height = drawInfo.height;
        this.width = drawInfo.width;
        this.isActive = false;
        this.damage= damage;
        this.isActive = true;
    };
    
}