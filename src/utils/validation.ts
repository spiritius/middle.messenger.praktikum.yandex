export function testRegex(value: string, regex: RegExp): boolean {
  return regex.test(value);
}

export function testLength(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

export function testOnlyDigits(value: string): boolean {
  return !/^\d+$/.test(value);
}

export function testPassword(value: string): boolean {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  return regex.test(value);
}

export function testEmptyPassword(value: string): boolean {
  const regex = /^.{8,40}$/;
  return regex.test(value);
}

export function testLogin(value: string): boolean {
  const regex = /^(?!\d+$)(?!.*[^\w-])(?!.*[^\w-])[A-Za-z0-9-_]{3,20}$/;
  return regex.test(value);
}

export function testEmail(value: string): boolean {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(value);
}

export function testName(value: string): boolean {
  const regex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
  return regex.test(value);
}

export function testPhone(value: string): boolean {
  const regex = /^\+?\d{9,14}$/;
  return regex.test(value);
}
