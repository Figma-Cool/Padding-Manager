figma.showUI(__html__, { width: 400, height: 225 });

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

const setPadding = (item, paddings) => {
  console.log('setPadding', item, paddings);
  item.parent.paddingTop = Number(paddings.top);
  item.parent.paddingBottom = Number(paddings.bottom);
  item.parent.paddingLeft = Number(paddings.left);
  item.parent.paddingRight = Number(paddings.right);
  item.parent.resize(item.parent.width, item.parent.height);
};

const paddingControl = (paddings) => {
  console.log('paddingControl');
  allLayers.forEach((item) => {
    if (item.name.includes(paddings.type)) {
      if (!item.layoutMode) {
        createFrame(item);
        item.name = item.name.replace(paddings.type, '');
        item.parent.layoutMode = 'VERTICAL';
        setPadding(item, paddings);
      } else {
        item.paddingTop = Number(paddings.top);
        item.paddingBottom = Number(paddings.bottom);
        item.paddingLeft = Number(paddings.left);
        item.paddingRight = Number(paddings.right);
        item.resize(item.width, item.height);
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
    let $1 = msg.value;
    paddingControl($1);
  }
  if (msg.type === '$2') {
    console.log(msg.value);
    let $2 = msg.value;
    paddingControl($2);
  }
  if (msg.type === '$3') {
    console.log(msg.value);
    let $3 = msg.value;
    paddingControl($3);
  }
};
