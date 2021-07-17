/**
 * phina-class-helper v0.0.1
 * 
 * MIT Lisenced
 * 
 * Copyright (C) 2018 Negiwine, https://github.com/negiwine
 */

export type FakeClassWrapperFP = <T>(_class: T) => T;
export type FakeClassWrapperTP = <T>(_class: T, _super: any) => T;
export type Register = (path: string) => { extends: (_super?: any) => (_class: any) => any; };
export type RegisterCreator = (phina: any) => Register;

export const fromPhina: FakeClassWrapperFP = (_class: any) => {

    const wrapper = function(){
        _class.prototype.init.apply(this, arguments);
    };
    wrapper.prototype = Object.create(_class.prototype);
    wrapper.prototype.constructor = wrapper;

    return <any>wrapper;
}

export const toPhina: FakeClassWrapperTP = (_class: any, _super?: any) => {

    const creator = function(...args: any[]){ return new _class(...args); };
    creator.prototype = Object.create(_class.prototype);
    creator.prototype.init = function(){
        this.__counter = this.__counter || 0;
        this.__counter++;
        _class.prototype.constructor.apply(this, arguments);
    };

    if(_super) creator.prototype.superClass = _super;

    return <any>creator;
}

export const register: RegisterCreator = (phina: any) => (path: string) => ({
    extends: (_super?: any) => (_class: any) => {
        
        if(typeof _super === 'string'){
            _super = phina.using(_super);
        }

        const creator = toPhina(_class, _super);
        phina.register(path, creator);

        return _class;
    }
});