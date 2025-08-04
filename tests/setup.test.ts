import mongoose from 'mongoose';
import { assert, describe, expect, it } from 'vitest';

describe('Server Test', () => {
  it('should run a basic assertion', () => {
    assert.isTrue(true);
  });

  it('should connect to the in-memory database', async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
