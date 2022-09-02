import { IDrawable } from "./Idrawable";

export interface Iweapon extends IDrawable {
    damage: number;
    isActive: boolean;
     
}