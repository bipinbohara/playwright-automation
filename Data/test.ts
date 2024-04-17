import {getParameterList} from './xmlParser';

const paramList = getParameterList(".Chart","XYZ");
console.log("PARAM: " + paramList["XYZ1"]);
console.log("PARAM: " + paramList["ABCD1"]);
console.log("PARAM: " + paramList["ABCD2"]);


const paramList2 = getParameterList(".Provider", "ABCD")
console.log("PARAM: " + paramList2["ABCD1"]);
console.log("PARAM: " + paramList2["ABCD2"]);
console.log("PARAM: " + paramList2["XYZ1"]);