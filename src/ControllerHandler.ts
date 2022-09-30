import { Action } from "./Actions";
import { Controller } from "./Controller";

export class ControllerHandler{
    private static controller1: Controller = undefined;
    private static controller2: Controller = undefined;

    public static setupControllers(controller1: Controller, controller2: Controller) {
        this.controller1 = controller1;
        this.controller2 = controller2;
    }

    public static dispatchAction(action: Action, controllerID: number){
        if( controllerID  === 1){
            this.controller1.doAction(action);
        }else if(controllerID === 2){
            this.controller2.doAction(action);
        }else {
            console.log(`Unassigned controllerID: ${controllerID}`);
        }
    }
}