import { IDrawable } from "./Idrawable";

export interface Iplayer extends IDrawable {
    id:number;
    velocity: {x:number; y: number}
    getDrawableCords(): IDrawable;
}