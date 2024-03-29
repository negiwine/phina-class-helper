# phina-class-helper

## 重要
このリポジトリは非推奨であり、既にメンテナンスされていません。
phina.js で class 構文を利用したい場合、 [phina-patch-es-classes-support](https://github.com/negiwine/phina-patch-es-classes-support) か、 [phina.jsのES Modules対応版](https://github.com/pentamania/phina.js/tree/esm-support_alpha) の利用を検討してください。

## このリポジトリについて
phina.jsのクラスとES2015のクラスを相互変換する、非公式のユーティリティです。
テストなどはしていないので信頼性は非常に低いです。

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