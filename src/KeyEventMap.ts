import { Action } from "./Actions";
import { KeyState } from "./KeyState";

export class KeyEventMap {
    private static _keyEventMap: Map<string, Action> = new Map();
    private static _initialized: boolean = false;

    static initialize() {

        this.mapKeyAction({ key: "a", keyState: KeyState.Pressed }, Action.MoveLeft);
        this.mapKeyAction({ key: "s", keyState: KeyState.Pressed }, Action.Crouch);
        this.mapKeyAction({ key: "d", keyState: KeyState.Pressed }, Action.MoveRight);
        this.mapKeyAction({ key: "w", keyState: KeyState.Pressed }, Action.Jump);
        this.mapKeyAction({ key: " ", keyState: KeyState.Pressed}, Action.Attack);
        
        this.mapKeyAction({ key: "a", keyState: KeyState.Released }, Action.StopMoveLeft);
        this.mapKeyAction({ key: "s", keyState: KeyState.Released }, Action.StopCrouch);
        this.mapKeyAction({ key: "d", keyState: KeyState.Released }, Action.StopMoveRight);
        this.mapKeyAction({ key: " ", keyState: KeyState.Released}, Action.StopAttack);

        this.mapKeyAction({ key: "arrowleft", keyState: KeyState.Pressed }, Action.MoveLeft);
        this.mapKeyAction({ key: "arrowdown", keyState: KeyState.Pressed }, Action.Crouch);
        this.mapKeyAction({ key: "arrowright", keyState: KeyState.Pressed }, Action.MoveRight);
        this.mapKeyAction({ key: "arrowup", keyState: KeyState.Pressed }, Action.Jump);

        this.mapKeyAction({ key: "arrowleft", keyState: KeyState.Released }, Action.StopMoveLeft);
        this.mapKeyAction({ key: "arrowdown", keyState: KeyState.Released }, Action.StopCrouch);
        this.mapKeyAction({ key: "arrowright", keyState: KeyState.Released }, Action.StopMoveRight);
    }   

    static mapKeyAction({ key, keyState }: { key: string, keyState: KeyState }, action: Action) {
        this._keyEventMap.set(JSON.stringify({ key, keyState }), action);
    }

    static getActionForKey(keyobj: { key: string, keyState: KeyState }) {
        console.log(`getting action for ${JSON.stringify(keyobj)}`);
        console.log(this._keyEventMap);
        return this._keyEventMap.get(JSON.stringify(keyobj));
    }
}