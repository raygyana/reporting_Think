import { Injectable, Optional } from '@angular/core';
import { Level } from './level';

export class Options {
    level: Level;
    global: boolean;
    globalAs: string;
    store: boolean;
    storeAs: string;
}

// For browsers that don't implement the debug method, log will be used instead. Fixes #62.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'log' : 'log';

// Temporal until https://github.com/angular/angular/issues/7344 gets fixed.
const DEFAULT_OPTIONS: Options = {
    level: Level.LOG,
    global: true,
    globalAs: 'logger',
    store: false,
    storeAs: 'angular2.logger.level'
};

@Injectable()
export class Logger {

    private _level: Level;
    private _globalAs: string;
    private _store: boolean;
    private _storeAs: string;

    public Level: any = Level;

    constructor( @Optional() options?: Options) {

        const { level, global, globalAs, store, storeAs } = Object.assign({}, DEFAULT_OPTIONS, options);

        this._level = level;
        this._globalAs = globalAs;
        this._storeAs = storeAs;

        global && this.global();

        if (store || this._loadLevel()) {
            this.store();
        }

    }

    private _loadLevel = (): Level => Number(localStorage.getItem(this._storeAs));

    private _storeLevel(level: Level) {
        localStorage[this._storeAs] = level;
    }

    error(message?: any, ...optionalParams: any[]) {
        this.isErrorEnabled() && console.error.apply(console, arguments);
    }

    warn(message?: any, ...optionalParams: any[]) {
        this.isWarnEnabled() && console.warn.apply(console, arguments);
    }

    info(message?: any, ...optionalParams: any[]) {
        this.isInfoEnabled() && console.info.apply(console, arguments);
    }

    debug(message?: any, ...optionalParams: any[]) {
        console.log(this.isDebugEnabled());
        this.isDebugEnabled() && console[CONSOLE_DEBUG_METHOD].apply(console, arguments);
    }

    log(message?: any, ...optionalParams: any[]) {
        this.isLogEnabled() && console.log.apply(console, arguments);
    }

    global = () => (<any>window)[this._globalAs] = this;

    store(): Logger {

        this._store = true;
        const storedLevel = this._loadLevel();
        if (storedLevel) {
            this._level = storedLevel;
        } else {
            this._storeLevel(this.level);
        }

        return this;

    }

    unstore(): Logger {
        this._store = false;
        localStorage.removeItem(this._storeAs);
        return this;
    }

    isErrorEnabled = (): boolean => this.level >= Level.ERROR;
    isWarnEnabled = (): boolean => this.level >= Level.WARN;
    isInfoEnabled = (): boolean => this.level >= Level.INFO;
    isDebugEnabled = (): boolean => this.level >= Level.DEBUG;
    isLogEnabled = (): boolean => this.level >= Level.LOG;

    get level(): Level {
        return this._level;
    }

    set level(level: Level) {
        this._store && this._storeLevel(level);
        this._level = level;
    }

}
