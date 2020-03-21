import { ObservableMap } from '../../src/maps/observable-map';

describe('ObservableMap', () => {
	describe('constructor()', () => {
		test('should create', () => {
			expect(new ObservableMap()).toBeTruthy();
		});
	});
});
