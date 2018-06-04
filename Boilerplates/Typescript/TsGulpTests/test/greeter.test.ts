import { expect } from "chai";
import Greeter from "../source/entities/greeter";

describe("Greeter Class", () => {
  it("Should set msg when an instance is created", () => {
    // expect(false).eq(true);
    const expected = "world!";
    const greater = new Greeter(expected);
    expect(greater.greeting).eql(expected);
  });
  it("Should greet", () => {
    const greet = "world!";
    const greater = new Greeter(greet);
    const actual = greater.greet();
    const expected = `Hello, ${greet}`;
    expect(actual).eql(expected);
  });

  it("Should get something", () => {
    const greater = new Greeter("test");
    const actual = greater.getSomething();
    expect(actual).eql("test");
  });
});
