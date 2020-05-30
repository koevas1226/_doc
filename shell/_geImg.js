
const fs = require('fs');
const header = [
  0x42,0x4D,
  0x36,0x88,0x2c,0x00, // file size
  0x00,0x00,0x00,0x00,
  0x36,0x00,0x00,0x00,
]

const DIB = [
  0x28,0x00,0x00,0x00,
  0x00,0x05,0x00,0x00, // 1280
  0xf8,0x02,0x00,0x00, // 760
  0x01,0x00,
  0x18,0x00,
  0x00,0x00,0x00,0x00, 
  0x00,0x88,0x2c,0x00, // bitmap size
  0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00, 
  0x00,0x00,0x00,0x00,
]
const WIDTH = 1280;
const HEIGHT = 760;
function _genBitMap(){
  const color = [0x88,0xa3,0x60];
  const buff = Buffer.alloc(_fileSize(WIDTH,HEIGHT));
  buff.fill(Buffer.from(header),0,14);
  buff.fill(Buffer.from(DIB),14,54);
  const step = _bitMapSize(WIDTH,HEIGHT) / 3;
  let start = 54, ending = 54+step;
  for (let i = 0; i < 3; i++) {
    console.log(start,ending, i+1);
    buff.fill(Buffer.alloc(step).fill(Buffer.from(color)),start,ending);
    start = ending;
    ending = ending + step;
  }
  return buff;
}

fs.writeFileSync('lilian.bmp', _genBitMap());
function _fileSize(width, heigth){
  return _bitMapSize(width, heigth) + 54;
}
function _bitMapSize(width, heigth){
  return Math.floor((24 * width + 31)/32) * 4 * heigth;
}

function _rawSize(width){
  return Math.floor((24 * width + 31)/32) * 4;
}

function _hexNumber(num){
  return Number(num).toString(16);
}

