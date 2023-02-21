console.log('TRACKER IS ON');
let click = 0;
const div = document.createElement('div');
div.innerHTML = 'ADDED BY TRACKER';

window.document.body.prepend(div);

console.log('TRACKER IS DONE');

window.onclick = () => {
  console.log('Page clicked')
  div.innerHTML = `CLICKED: ${++click}`;

  window.trackerLayer.push(new Date());

  console.log(`content of window.trackerLayer: ${JSON.stringify(window.trackerLayer)}`);
}
