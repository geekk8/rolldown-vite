
//#region src/utils.ts
function logger(message) {
	console.log(`[LOG] ${message}`);
}

//#endregion
//#region src/hello.js
function hello() {
	console.log("hello rolldown!");
}
logger("hello page loaded!");

//#endregion
//#region src/lib.ts
function used() {
	console.log("이 함수는 사용됩니다");
}

//#endregion
//#region src/main.js
logger("main page loaded!");
hello();
used();

//#endregion