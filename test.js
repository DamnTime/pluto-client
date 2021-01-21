const demo = [
  {
    id: 2,
    pid: 1,
  },
  {
    id: 1,
    pid: null,
  },
  {
    id: 4,
    pid: 3,
  },
  {
    id: 3,
    pid: 2,
  },
  // {
  //   id: 5,
  //   pid: 5,
  // },
  // {
  //   id: 5,
  //   pid: 5,
  // },
];

// const corrent = [
//   {
//     id: 3,
//     pid: null,
//     children: [
//       {
//         id: 4,
//         pid: 3,
//       },
//     ],
//   },
// ];

// const arrToTree = (array = '[]') => {
//   // array = JSON.parse(array);
//   const map = {};
//   const root = [];
//   const length = array.length;
//   for (let index = 0; index < length; index++) {
//     const element = array[index];
//     map[element.id] = index;
//   }
//   for (let index = 0; index < length; index++) {
//     const node = array[index];
//     const currentInMap = map[node.pid];
//     if (currentInMap !== null && currentInMap !== undefined) {
//       !array[currentInMap].children && (array[currentInMap].children = []);
//       array[currentInMap].children.push(node);
//     } else {
//       root.push(node);
//     }
//   }
//   return root;
// };

// const ar = [
//   { id: 1, pid: null },
//   { id: 5, pid: 4 },
//   { id: 2, pid: 1 },
//   { id: 3, pid: 2 },
//   { id: 6, pid: 4 },
//   { id: 4, pid: 2 },
//   { id: 23, pid: 11 },
//   { id: 11, pid: null },
//   { id: 7, pid: 4 },
// ];

function arrToTree(arr) {
  const map = {};
  const root = [];
  arr.forEach((item) => {
    if (item.pid === null) {
      // 根节点
      map[item.id] = Object.assign(item, map[item.id]);
      root.push(map[item.id]);
    } else {
      // 叶子节点
      if (map[item.pid]) {
        // map中存在上级节点，则添加到上级节点的children中
        map[item.pid].children = map[item.pid].children || [];
        map[item.pid].children.push(item);
      } else {
        // 不存在上级节点，则创造一个上级节点，ps:循环到上级节点时，直接替换。
        map[item.pid] = { id: item.pid, pid: null, children: [item] };
      }
      map[item.id] = Object.assign(item, map[item.id]); // 设置当前id的map，若存在创造的节点，则合并
    }
  });
  return root;
}

console.log(JSON.stringify(arrToTree(demo)));
