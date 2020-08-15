import { LitElement } from "lit-element";
export declare class UfoValidator extends LitElement {
    private dataYaml;
    private problems;
    private validate;
    private debouncer;
    private queueValidation;
    render(): import("lit-element").TemplateResult;
}
