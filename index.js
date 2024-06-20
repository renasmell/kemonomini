/// <reference types="../CTAutocomplete" />

import settings from "./gui.js";

let File = java.io.File;
let modulesPath = new File(Config.modulesFolder).getAbsolutePath().replace(/\\/gi, '/');
let folder = new File(modulesPath + '/kemonomini/assets');
let frameNames = folder.list().filter(name => /.png$/.test(name));

let kemonominis;
// hopefully minimize lag from loading images on load
new Thread(() => kemonominis = frameNames?.map(assetName => Image.fromAsset(assetName))).start();
let c = 0;
let currentFrame = null; 

register('renderOverlay', () => {
  if (!settings().kemonominitoggled || !currentFrame) return;
  if (settings().ontop) Renderer.translate(0,0,500);
  currentFrame.draw(settings().kemonominix, settings().kemonominiy, settings().size,settings().size);
  if (settings().ontop) Renderer.translate(0,0,0);
})

register('step', () => {
  if (!settings().kemonominitoggled || !kemonominis) return;
  if (c >= kemonominis.length-1) {
    c = -1
    currentFrame = null;
  }
  c++;
  currentFrame = kemonominis[c];
}).setFps(60);

// sounds
// too lazy to find actual fox sounds so its just anime girl meowing
let sounds = folder.list().filter(name => /.ogg$/.test(name)); 

let soundtrigger = register('step', () => {
  if (!settings().sound || !World.isLoaded()) return;

  if (settings().sound_frequency === "low") soundtrigger.setDelay(Math.floor(Math.random() * 5000));
  else if (settings().sound_frequency === "medium") soundtrigger.setDelay(Math.floor(Math.random() * 1000));
  else soundtrigger.setDelay(Math.floor(Math.random() * 100));

  new Thread(() => {
    let a = new Sound({ source: sounds[Math.floor(Math.random() * sounds.length)] })
    a?.play();
  }).start();
}).setDelay(1);



// cleanup
register('gameUnload', () => {
  if (!settings().kemonominitoggled) return; 
  currentFrame = null;
  c = 0;
  kemonominis?.forEach(image => image.destroy())   
})
