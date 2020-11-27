figma.showUI(__html__, { width: 300, height: 400 });

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

figma.currentPage.findAll().forEach(item => {
    if (item.name.includes("$1")) {
        if (!item.layoutMode) {
            createFrame(item)
            item.name = item.name.replace('$1', '')
            item.parent.layoutMode = "VERTICAL"
            item.parent.paddingTop = 200
            item.parent.paddingBottom = 200
            console.log(item.parent)
        }
    }
});