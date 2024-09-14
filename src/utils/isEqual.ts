function isEqual(a: object, b: object): boolean {
  if (a === b) 
    return true;

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null)
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length)
    return false;

  for (const key of keysA) {
    if (!keysB.includes(key))
      return false;

    const vA = (a as any)[key];
    const vB = (b as any)[key];

    if (!isEqual(vA, vB))
      return false;
  }

  return true;
}

export default isEqual;
