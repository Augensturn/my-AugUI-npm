export interface InputProps{
    type?: string;
    size?: 'large' | 'small';
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
    modelValue:string;
    placeholder?: string;
    readonly?: boolean;
    autoComplete?: string;
    autofocus?: boolean;
    form?: string
}

export interface InputEmits{
    (e:'change',value:string) : void //修改了值 且失去focus
    (e:'input',value:string) : void //值发生变化
    (e:'focus',value:FocusEvent) : void
    (e:'blur',value:FocusEvent) : void //失去焦点
    (e:'clear') : void //一键清空
    (e:'update:modelValue',value:string) :void //支持v-model
}

export interface InputInstance{
    ref:HTMLInputElement | HTMLTextAreaElement
}