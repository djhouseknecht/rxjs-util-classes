import { RxjsUtilClasses } from '../src';

describe('Index', () => {
  test('should create the class and say hello', () => {
    const clazz = new RxjsUtilClasses();
    expect(clazz).toBeTruthy();
    expect(clazz.sayHello()).toBe('Hello World');
  });
});
