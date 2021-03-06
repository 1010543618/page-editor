export {default as init} from "./src/init";
export {default as load_page} from "./src/load_page";
export {default as source} from "./src/source";
export {default as hide_ori} from "./src/hide_ori";
export {default as publish} from "./src/publish";
export {default as save} from "./src/save";
export {default as preview} from "./src/preview";
export {default as discard} from "./src/discard";
export {default as res} from "./src/res";
export {default as undo} from "./src/undo";
export {default as redo} from "./src/redo";
export {default as correct_not_trans} from "./src/correct_not_trans";
export {default as google_translate} from "./src/google_translate";
export {default as edit_trans}from "./src/edit_trans";
export {default as disable_script}from "./src/disable_script";
export {default as clear_unnecessary_tags}from "./src/clear_unnecessary_tags";
// 使用requirejs时要手动给window.PE赋值
window.PE = window.PE || exports