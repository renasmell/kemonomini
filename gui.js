import Settings from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig";

const defconfig = new DefaultConfig("kemonomini", "preferences.json");

const movegui = new Gui();
movegui.registerClicked((mx, my) => {
    Client.currentGui.close();

    config.settings.kemonominix = mx;
    config.settings.kemonominiy = my;
    // save values to preferences
    config.setConfigValue("Kemonomini", "kemonominix", mx);
    config.setConfigValue("Kemonomini", "kemonominiy", my);

    ChatLib.chat(`&a#&dkemonomini &7set render location`);
})
movegui.registerDraw((mx, my) => {
    // drawSplitString
    Renderer.getFontRenderer().func_78279_b("kemonomini here", mx + 5, my + 5, config.settings.size - 5, 0xFFFFFF);
    Renderer.drawRect(Renderer.color(0,0,0,100), mx, my, config.settings.size, config.settings.size);
})

defconfig.addSwitch({
    category: "Kemonomini", 
    configName: "kemonominitoggled",
    title: "toggled",
    description: "toggle kemonomini",
}).addSlider({
    category: null,
    configName: "size",
    title: "size",
    description: "sets the width and height of kemonomini",
    value: 64,
    options: [10, 500],
}).addButton({
    category: null,
    configName: "moveButton",
    placeHolder: "click",
    title: "move",
    description: "opens menu to move kemonomini",
    onClick() {
        movegui.open(); 
    }
}).addSwitch({
    category: null, 
    configName: "ontop",
    title: "focus",
    description: "whether or not it should focus above other things like inventory, scoreboard, etc",
}).addSwitch({ 
    category: null,
    configName: "sound",
    title: "sounds",
    description: "whether or not sounds should play randomly"
}).addSelection({
    category: null,
    configName: "sound_frequency",
    title: "frequency",
    description: "frequency of sounds",
    options: ["low", "medium", "high"],
    shouldShow(s) {
        return s.sound;
    }
})
// too lazy to use pogdata to save vars or look for the correct way
// i dont think anyone has a resolution higher than 4k playing minecraft i hope
.addSlider({category: null, title: "", options: [0, 9999], shouldShow() { return false }, configName: "kemonominix" })
.addSlider({category: null, title: "", options: [0, 9999], shouldShow() { return false }, configName: "kemonominiy" });

const config = new Settings("kemonomini", defconfig)
    .setCommand('kemonomini');


export default () => config.settings;
