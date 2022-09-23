import { CanvasProperties } from "./IcanvasProperties";
import { IDrawable } from "./Idrawable";
import { Iplayer } from "./IPlayer";
import { Player } from "./Player";
import { Sword } from "./Sword";


const mastImage = new Image();
mastImage.src = "./assets/images/mast_head.png";

const backgroundImage = new Image();
backgroundImage.src = "./assets/images/game_level_background.webp";

class Canvas {
    private _canvasElement: HTMLCanvasElement | null;
    private _canvas: CanvasRenderingContext2D | null;
    private _id: string;
    private _height: number;
    private _width: number;
    private _backgroundColor: string;

    constructor(properties: CanvasProperties) {
        this._height = properties.height;
        this._width = properties.width;
        this._id = properties.id;
        this._backgroundColor = properties.backgroundColor;
    }

    public initialize() {
        console.log(`Finding canvas with id: '${this._id}' ...`)

        this._canvasElement = document.getElementById(this._id) as HTMLCanvasElement;
        if (this._canvasElement === null) {
            throw new Error("Cannot find canvas");
        }

        this._canvasElement.height = this.height;
        this._canvasElement.width = this.width;

        console.log(`Canvas found with id: '${this._id}'`);


        this._canvas = this._canvasElement.getContext("2d");
        if (this._canvas === null) {
            throw new Error("Unable to get 2d context");
        }
        console.log("Context Ready...")
    }
    public set height(height: number) {
        console.log("setting height");
        this._height = height;
    }

    public set width(width: number) {
        console.log("setting height");
        this._width = width;
    }
    public get height() {
        return this._height
    }

    public get width() {
        return this._width;
    }
    clear() {
        this._canvas.drawImage(backgroundImage, 530, 150, this.width, this.height, 0, 0, this.width, this.height);
    }

    public draw(drawables: IDrawable[]) {
        drawables.forEach(drawable => {
            // console.log("object =compare");
            // console.log(drawable instanceof Player);
            if (drawable instanceof Player) {
                this.drawObject(drawable);
                // console.log(`weapong active: ${drawable.weapon.isActive}`);
                this.drawObject(drawable.getWeaponForDraw());
            }

        });

    }

    public drawMastHead() {
        this._canvas.drawImage(mastImage, 0, 0);
    }

    public drawObject(drawableObject: IDrawable) {
        this._canvas.fillStyle = drawableObject.color;
        this._canvas.fillRect(
            drawableObject.x,
            drawableObject.y,
            drawableObject.width,
            drawableObject.height
        );
    }
}

let canvasProperties: CanvasProperties = {
    id: "canvas",
    height: 500,
    width: 1000,
    backgroundColor: "black"
}
export const canvas = new Canvas(canvasProperties);
canvas.initialize();

export let Player1 = new Player(1, 3, { x: 100, y: 100, height: 50, width: 5, color: 'red' });
export let Player2 = new Player(2, 2, { x: 400, y: 100, height: 50, width: 5, color: 'green' });


let weaponDrawConfig: IDrawable = {
    x: 0,
    y: 0,
    height: 30,
    width: 5,
    color: "white"
}

Player1.setWeapon(new Sword(weaponDrawConfig, 10));
Player2.setWeapon(new Sword(weaponDrawConfig, 10));

let upkeyleft = 0;
let upkeyright = 0;
window.addEventListener("keydown", (key => {
    switch (key.key) {
        case "a":
        case "A":
            Player1.velocity.x = -Player1.PlayerSpeed;
            Player1.lastKey = 'a';
            break;
        case "d":
        case "D":
            Player1.velocity.x = Player1.PlayerSpeed;
            Player1.lastKey = 'd';
            break;
        case 'w':
            if (upkeyleft != 0) return
            upkeyleft++;
            Player1.jump();
            break;
        case " ":
            Player1.activateWeapon();
            break;
    }
}))


window.addEventListener("keydown", (key => {
    switch (key.key) {
        case "ArrowLeft":
        case "A":
            Player2.velocity.x = -Player2.PlayerSpeed;
            Player2.lastKey = 'ArrowLeft';
            break;
        case "ArrowRight":
        case "D":
            Player2.velocity.x = Player2.PlayerSpeed;
            Player2.lastKey = 'ArrowRight';
            break;
        case 'ArrowUp':
            if (upkeyright != 0) return
            upkeyright++;
            Player2.jump();
            break;
    }
}))


window.addEventListener("keyup", (key) => {
    console.log(`'${key.key}' l:${key.key.length}`);
    if (key.key == 'w') {
        upkeyleft = 0;
    } else if (key.key === ' ') {
        Player1.deactivateWeapon();
    }
    if (Player1.lastKey.toLowerCase() === key.key.toString().toLowerCase())
        switch (key.key) {
            case "a":
            case "A":
                Player1.velocity.x = 0;
                break;
            case "d":
            case "D":
                Player1.velocity.x = 0;
                break;
        }
})



window.addEventListener("keyup", (key) => {
    if (key.key == 'ArrowUp') {
        upkeyright = 0;
    }
    if (Player2.lastKey.toLowerCase() === key.key.toString().toLowerCase())
        switch (key.key) {
            case "ArrowLeft":
            case "A":
                Player2.velocity.x = 0;
                break;
            case "ArrowRight":
            case "D":
                Player2.velocity.x = 0;
                break;
        }
})

function animate() {
    window.requestAnimationFrame(animate);
    canvas.clear();
    canvas.drawMastHead();
    canvas.draw([Player1, Player2]);
    Player1.updatePos();
    Player2.updatePos();
}

animate();