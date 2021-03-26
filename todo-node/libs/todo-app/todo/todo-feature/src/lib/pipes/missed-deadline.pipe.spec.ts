import { MissedDeadlinePipe } from './missed-deadline.pipe';

describe('MissedDeadlinePipe', () => {
  it('create an instance', () => {
    const pipe = new MissedDeadlinePipe();
    expect(pipe).toBeTruthy();
  });
});
