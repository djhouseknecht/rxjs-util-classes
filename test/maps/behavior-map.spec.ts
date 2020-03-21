import { BehaviorMap } from '../../src/maps/behavior-map';

const initialValue: string = 'value';
let map: BehaviorMap<string, typeof initialValue>;

describe('BehaviorMap', () => {
	beforeEach(() => {
		map = new BehaviorMap(initialValue);
	});

	describe('constructor()', () => {
		test('should call set subject to behavior subject and intial value', () => {
			expect(map['__initialOption']).toEqual(initialValue);
		});
	});

	describe('get()', () => {
		test('should return the sync value', () => {
			const obj = { key: 'key', value: 'map-value' };
			map.set(obj.key, obj.value);
			expect(map.get(obj.key)).toBe(obj.value);
		});
	});

	describe('forEach()', () => {
		test('should call forEach with the sync values', () => {
			const obj = { key: 'key', value: 'map-value' };
			map.set(obj.key, obj.value);
			map.forEach((value, key) => {
				expect(value).toBe(obj.value);
				expect(key).toBe(obj.key);
			});
		});
	});

	describe('values()', () => {
		test('should call values with the sync values', () => {
			const obj = { key: 'key', value: 'map-value' };
			map.set(obj.key, obj.value);
			Array.from(map.values()).forEach((value) => {
				expect(value).toBe(obj.value);
			});
		});
	});

	describe('entries()', () => {
		test('should call entries with the sync values', () => {
			const obj = { key: 'key', value: 'map-value' };
			map.set(obj.key, obj.value);
			Array.from(map.entries()).forEach((entry) => {
				expect(entry[1]).toBe(obj.value);
				expect(entry[0]).toBe(obj.key);
			});
		});
	});
});
