import { Action } from "./Actions";
import { ControllerHandler } from "./ControllerHandler";
import { KeyControllerMap } from "./KeyControllerMap";
import { KeyEventMap } from "./KeyEventMap";
import { KeyState } from "./KeyState";

export class KeyHandler {
    static handle(window: Window) {
        window.onkeydown = (key) => {
            this.HandleKey(key.key.toString().toLowerCase(), KeyState.Pressed);
        };
        window.onkeyup = (key) => {
            this.HandleKey(key.key.toString().toLowerCase(), KeyState.Released);
        }
    }

    private static HandleKey(key: string, keyState: KeyState) {

        let [action, controllerID] = this.getActionAndControllerID({ key, keyState });
        if (action === undefined || controllerID === -1){
            console.log(`Action or controller Undefined ${action} ${controllerID}`);
            return;
        }    

        this.dispatchAction(action, controllerID);
    }

    private static dispatchAction(action: Action, controllerID: number) {
        ControllerHandler.dispatchAction(action, controllerID);
    }
    private static getActionAndControllerID({ key, keyState }: { key: string, keyState: KeyState }) {
        console.log({key,keyState});
        let action = KeyEventMap.getActionForKey({ key, keyState });
        let controllerID = KeyControllerMap.getMappedControllerID(key);

        return [action, controllerID];
    }
}