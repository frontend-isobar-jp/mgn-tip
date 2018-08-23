import mgnTip from './mgn-tip';

let tip = new mgnTip(
    ".j-tip",
    {
        fadeSpeed: 100
    }
);

tip.ShowEnd = function(){
    console.log("ShowEnd");
};
