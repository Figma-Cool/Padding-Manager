figma.showUI(__html__, { width: 300, height: 400 });

const allLayers = figma.currentPage.findAll();
let $1;

const createFrame = (item) => {
  let frame = figma.createFrame();
  let x = item.x;
  let y = item.y;
  frame.name = item.name;
  frame.fills = [];
  frame.resize(item.width, item.height);
  item.parent.appendChild(frame);
  frame.x = x;
  frame.y = y;
  frame.appendChild(item);
  item.x = 0;
  item.y = 0;
};

const paddingControl = (paddings) => {
  console.log('paddingControl');
  const setPadding = (item, paddings) => {
    console.log('setPadding',item, paddings);
    item.paddingTop = paddings.top.toString();
    item.parent.paddingBottom = paddings.bottom;
    item.parent.paddingLeft = paddings.left;
    item.parent.paddingRight = paddings.right;
  };
  allLayers.forEach((item) => {
    if (item.name.includes(paddings.type)) {
      console.log(item);
      if (!item.layoutMode) {
        createFrame(item);
        item.name = item.name.replace(paddings.type, '');
        item.parent.layoutMode = 'VERTICAL';
        setPadding(item, paddings);
      } else {
        // setPadding(item, paddings);
        // figma.ui.postMessage({
        //   top: item.paddingTop,
        //   left: item.paddingLeft,
        //   right: item.paddingRight,
        //   bottom: item.paddingBottom,
        // });
      }
    }
  });
};

figma.ui.onmessage = (msg) => {
  if (msg.type === '$1') {
    console.log(msg.value);
    $1 = msg.value;
    paddingControl($1);
  }
};
