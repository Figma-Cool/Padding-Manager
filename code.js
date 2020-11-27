figma.showUI(__html__, { width: 300, height: 400 });

const allLayers = figma.currentPage.findAll();
let $1

const createFrame = item => {
    let frame = figma.createFrame();
    let x = item.x;
    let y = item.y;
    frame.name = item.name;
    frame.fills = [];
    frame.resize(item.width, item.height)
    item.parent.appendChild(frame);
    frame.x = x;
    frame.y = y;
    frame.appendChild(item);
    item.x = 0;
    item.y = 0;
}






// const paddings = {

// };

const paddingControl = (paddings) => {
    allLayers.forEach(item => {
        const setPadding = (paddings) => {
            item.parent.paddingTop = paddings.top
            item.parent.paddingBottom = paddings.bottom
            item.parent.paddingLeft = paddings.left
            item.parent.paddingRight = paddings.right
        }
        figma.ui.onmessage = msg => {
            if (msg.type === '$1') {
                console.log(msg.value)
                $1 = msg.value
                setPadding($1)
            }
        }
        if (item.name.includes(`${paddings}`)) {
            if (!item.layoutMode) {
                createFrame(item)
                item.name = item.name.replace(`${paddings}`, '')
                item.parent.layoutMode = "VERTICAL"
                setPadding(paddings)
            } else {
                setPadding($1)
                figma.ui.postMessage({
                    top: item.paddingTop,
                    left: item.paddingLeft,
                    right: item.paddingRight,
                    bottom: item.paddingBottom,
                })
            }
        }
    });
}

paddingControl("$1")