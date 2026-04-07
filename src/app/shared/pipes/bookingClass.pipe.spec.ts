import { BookingClassPipe } from './bookingClass.pipe';

describe('BookingClassPipe', () => {
  it('create an instance', () => {
    const pipe = new BookingClassPipe();
    expect(pipe).toBeTruthy();
  });
});
