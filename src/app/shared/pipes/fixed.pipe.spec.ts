import { FixedPipe } from './fixed.pipe';

describe('NumberPipe', () => {
  it('create an instance', () => {
    const pipe = new FixedPipe();
    expect(pipe).toBeTruthy();
  });
});
