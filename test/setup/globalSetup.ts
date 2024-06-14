import * as expect from "@jest/expect";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.expect = expect.jestExpect;

export const mochaHooks = {
  beforeAll(done: () => void) {
    const setup = (): void => {
      done();
    };
    setup();
  },
};
