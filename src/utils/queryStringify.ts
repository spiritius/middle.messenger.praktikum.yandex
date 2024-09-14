type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed, parentKey: string | null = null): string | never {
  if (typeof data !== 'object' || data === null)
    throw new Error('input must be an object');
    
  let result: string = '';

  Object.keys(data).forEach(key => {
    const value = data[key];
    const fullkey = parentKey ? `${parentKey}[${key}]` : key;

    console.log(value, fullkey);
    
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
      result += `&${fullkey}=${encodeURIComponent(value)}`;
    else if (Array.isArray(value))
      value.forEach((item, index) => {
        result += `&${fullkey}[${index}]=${encodeURIComponent(item)}`;
      });
    else if (typeof value === 'object' && value !== null)
      result += `&${queryStringify(value, fullkey)}`;
  });

  return result.slice(1);
}

export default queryStringify;
