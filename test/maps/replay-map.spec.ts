import { ReplayMap } from '../../src/maps/replay-map';

describe('ReplayMap', () => {
	describe('constructor()', () => {
		test('should create', () => {
			const replayAmount = 4;
			const map = new ReplayMap(replayAmount);
			expect(map).toBeTruthy();
			expect(map['__initialOption']).toBe(replayAmount);
		});
	});
});
