"usestrict";

const dataText = `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

https://static-cdn.123rf.com/images/v5/index-thumbnail/84170952-b.jpg

Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg`;

let textToJson = function(textData){
    let outObj=[];
    let separators = ['jpg', 'jpeg', 'png', 'gif'];

    let splitedText = textData.split(new RegExp(separators.join('|'), 'g'))  //https://stackoverflow.com/a/19313633
        .map(value => value.split('https'));

    splitedText.map(val=>{
        if(val.length>1){
            let fluent={
                text:val[0],
                img:{
                    url:`'https${val[1]}jpg`
                }
            };
            outObj.push(fluent);
        }
    });
    return outObj;
};



let check = textToJson(dataText);

console.log(check);

function getSlides(body) {
    let slides = [{ 'message-text': body, image: null }];
    const imageNameRegex = /https?:\/\/[^\s]+\.(jpe?g|png|gif)+(\s|$)/g;

    if (imageNameRegex.test(body)) {
        const imageUrls = body.match(imageNameRegex);
        const data = [];

        let isTextSlideOnly = false;

        const urlIndexes = {};

        imageUrls.forEach((rawUrl, i) => {
            const url = rawUrl.trim();

            urlIndexes[url] = !(url in urlIndexes) ? _getIndexList(body, url) : urlIndexes[url];
            const index = urlIndexes[url].shift();
            const startFromUrl = index === 0;

            if (!startFromUrl && i === 0) {
                data.push({ 'message-text': '', image: null, index: { start: 0 } });
                isTextSlideOnly = true;
            }
            data.push({ image: { url }, index: { start: index, finish: index + url.length } });
        });

        slides = data.map((element, i) => {
            let text =
                data.length - 1 > i
                    ? body.slice(data[i].index.finish + 1, data[i + 1].index.start - 1)
                    : body.slice(data[i].index.finish + 1);

            if (isTextSlideOnly) {
                text = body.slice(0, data[i + 1].index.start - 1);
                isTextSlideOnly = false;
            }

            return { duration: 5, image: element.image, 'message-text': text || '' };
        });
    }

    return slides;
}

function _getIndexList(body, url) {
    const list = [];
    let lastIndex = body.indexOf(url, 0);

    while (lastIndex !== -1) {
        list.push(lastIndex);
        lastIndex = body.indexOf(url, lastIndex + 1);
    }

    return list;
}