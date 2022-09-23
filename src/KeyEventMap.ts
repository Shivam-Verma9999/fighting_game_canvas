import { Action } from "./Actions";
import { KeyState } from "./KeyState";

export class KeyEventMap {
    private static _keyEventMap: Map<{ key: string, keyState: KeyState }, Action> = new Map();
    private static _initialized: boolean = false;

    static initialize() {

        this.mapKeyAction({ key: "a", keyState: KeyState.Pressed }, Action.MoveLeft);
        this.mapKeyAction({ key: "s", keyState: KeyState.Pressed }, Action.Crouch);
        this.mapKeyAction({ key: "d", keyState: KeyState.Pressed }, Action.MoveRight);
        this.mapKeyAction({ key: "w", keyState: KeyState.Pressed }, Action.Jump);

        this.mapKeyAction({ key: "a", keyState: KeyState.Released }, Action.StopMoveLeft);
        this.mapKeyAction({ key: "s", keyState: KeyState.Released }, Action.StopCrouch);
        this.mapKeyAction({ key: "d", keyState: KeyState.Released }, Action.StopMoveRight);
    }

    static mapKeyAction({ key, keyState }: { key: string, keyState: KeyState }, action: Action) {
        this._keyEventMap.set({ key, keyState }, action);
    }

    static getActionForKey(keyobj: { key: string, keyState: KeyState }) {
        return this._keyEventMap.get(keyobj);
    }
}