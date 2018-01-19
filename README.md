# phina-class-helper

## なにこれ
phina.jsのクラスとES2015のクラスを相互変換するやつです。
テストとかしてないので信頼性はないです。もちろん非公式です。

## インストール
`npm install negiwine/phina-class-helper`

## 使い方

```js
const phina = require('phina.js');

const { register, fromPhina } = require('phina-class-helper');
const define = register(phina);

const DisplayScene = fromPhina(phina.display.DisplayScene);

class MainScene extends DisplayScene {
    constructor(){
        super({ width: 640, height: 960 });
        //...
    }

    update(){
        //...
    }
}
define('MainScene').extends('DisplayScene')(MainScene);
```

### デコレータ
```js
const phina = require('phina.js');

const { register, fromPhina } = require('phina-class-helper');
const define = register(phina);

const DisplayScene = fromPhina(phina.display.DisplayScene);

@define('MainScene').extends('DisplayScene')
class MainScene extends DisplayScene {
    constructor(){
        super({ width: 640, height: 960 });
        //...
    }

    update(){
        //...
    }
}
```

## API

- fromPhina

    ```
    fromPhina: (_class: any) => any
    ```

    phina.jsのクラスをES2015のクラスに変換します。
    
    _classにはphina.jsで作られたクラスを指定します。

- toPhina

    ```
    toPhina: (_class: any, _super?: any) => any
    ```

    ES2015のクラスをphina.jsのクラスに変換します。

    _classはES2015のクラス、_superにはphina.jsのクラスもしくは`toPhina`で変換されたクラスを指定します。

- register

    ```
    register: (phina: any) =>
        (path: string) => {
            extends: (_super?: any) => (_class: any) => any;
        }
    ```

    toPhinaを実行してphina.registerする関数を返します。

## License
MIT