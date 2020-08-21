"usestrict";

const dataText = `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

https://static-cdn.123rf.com/images/v5/index-thumbnail/84170952-b.jpg

Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg`;

let textToJson = function (textData) {
    if(typeof (textData)!=="string"){
        return false;
    }
    let outObj = [];
    let separators = ['jpg', 'jpeg', 'png', 'gif'];

   textData.split(new RegExp(separators.join('|'), 'g'))  //https://stackoverflow.com/a/19313633
        .map(value => value.split('https'))
        .map(val => {
            if (val.length > 1) {
                outObj.push({
                    text: val[0],
                    img: {
                        url: `'https${val[1]}jpg`
                    }
                });
            }
        });
    return outObj;
};

let check = textToJson(dataText);

console.log(check);

