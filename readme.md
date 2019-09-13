# LOGERATOR

![NpmVersion](https://img.shields.io/npm/v/logerator.svg)
![Travis (.org) branch](https://img.shields.io/travis/chrispaulsantos/logerator/master.svg)
![npm](https://img.shields.io/npm/dt/logerator.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/chrispaulsantos/logerator.svg)
![GitHub issues](https://img.shields.io/github/issues/chrispaulsantos/logerator.svg)


Logerator is a class decorator to log all function calls from a class. Adding console logs to every method on a class is time-consuming and produces messy code, so logerator aims to relieve the console.logs intruding on code by logging the start and end of a function as well as the result of the function call.

## Installation
```bash
$ npm install --save logerator
```

## Usage

### Default: console.log
```typescript
import { log } from 'logerator';

@log()
export class Comic {
    private _title: string = 'myTitle';

    public getTitle() {
        return this._title;
    }
}
```

#### Output
```bash
START: Comic.getTitle()
---- RESULT ----
myTitle
END: Comic.getTitle()
```

### Custom: logWithDate
```typescript
import { log } from 'logerator';

function logWithDate(msg) {
    console.log(`${new Date()} - ${msg}`)
}

@log({ logFunction: logWithDate })
export class Comic {
    private _title: string = 'myTitle';

    public getTitle() {
        return this._title;
    }
}
```

#### Output
```bash
2019-09-13T02:21:04.681Z - START: Comic.getTitle()
2019-09-13T02:21:04.681Z - ---- RESULT ----
2019-09-13T02:21:04.681Z - myTitle
2019-09-13T02:21:04.681Z - END: Comic.getTitle()
```

## Options
* `logFunction` - The log function to use instead of console.log

## Todo
* Add log decorator for methods