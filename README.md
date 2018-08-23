# mgn-tip ( Don't Need jQuery )


Implement tooltips function.

- Target browser : IE9+

___

# Install

```
npm i mgn-tip -S
```

## Or Download raw data
[↓ download "mgn-tip.js"](https://raw.githubusercontent.com/frontend-isobar-jp/mgn-tip/master/src/mgn-tip.js)


___

# Import

```
import mgnTip from "mgn-tip"
```

Prepare an HTML with tooltips display orientation in data attribute.
```
<a class="j-tip_btn" data-direction="[top, right, bottom, left]">top</a>
```

___

# Constructor

```
new mgnTip(element [, option]);
```
|Argument|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|element|String|-(Required)|Specify target element<br>ex) ".j-tip"|
|option|Object|-|ex)<br>option = {<br>event: "click",<br>fadeSpeed: 100,<br>btnElm: ".btn",<br>detailElm: ".detail"<br>}|


|Option|Data type|Default|Descroption|
|:-------|:--------|:------|:----------|
|event|String|"hover"|Specify event to open or close ("hover" or "click").|
|fadeSpeed|Number|0|Adjust open and close speed.|
|btnElm|String|".j-tip_btn"|Specify element to become button.|
|detailElm|String|".j-tip_detail"|Specify element to be content.|


___

# Method

|Method|Argument|Descroption|
|:-------|:--------|:------|
|ShowEnd = function(){};|-|To be executed after tooltips are displayed.|


___

# Demo

[https://frontend-isobar-jp.github.io/mgn-tip/](https://frontend-isobar-jp.github.io/mgn-tip/)

```
import mgnTip from 'mgn-tip';

let tip = new mgnTip(
    ".j-tip",
    {
        fadeSpeed: 100
    }
);

tip.ShowEnd = function(){
    console.log("ShowEnd");
};
```
