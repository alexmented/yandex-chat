type PlainObject<T = unknown> = {
	[k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	// @ts-ignore
	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			// @ts-ignore
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
	return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
	const result: [string, string][] = [];

	// @ts-ignore
	for (const [key, value] of Object.entries(data)) {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}

	return result;
}

export function queryString(data: PlainObject | unknown) {
	if (!isPlainObject(data)) {
		throw new Error('input must be an object');
	}

	return getParams(data).map(arr => arr.join('=')).join('&');
}
