
//#region src/hello.js
function hello() {
	console.log("hello rolldown!");
}

//#endregion
//#region src/sum.ts
function sum(a, b) {
	console.log("sum", a + b);
	return a + b;
}

//#endregion
//#region src/lib.ts
function used() {
	console.log("이 함수는 사용됩니다");
}

//#endregion
//#region src/main.js
hello();
sum(3, 4);
used();

//#endregion