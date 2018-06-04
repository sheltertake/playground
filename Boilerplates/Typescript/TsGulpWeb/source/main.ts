import * as $ from "jquery";
import Greeter from "./entities/greeter";
// alert("hello world");
const greeter = new Greeter("Ts Greeter world!");
const msg = greeter.greet();
// let msg = "Hello ts world"; //greeter.greet();
$("body").html(`<h1>${msg}</h1>`);
