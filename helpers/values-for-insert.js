/**
 * @param  {[String]} values Array of values for those column names
 */
const valueForQuery = (_values) => {
  const values = _values.map(item => {
    let val;
    switch (typeof item) {
      case 'number':
        return item;
      case 'string':
        val = item;
        break;
      default:
        return item.toString();
    }
    return `'${val}'`;
  })
  return `(${values.join(', ')})`;
};

/**
 * @param  {[String]} values Array of values for those column names, can be multidientional
 */
const valuesForQuery = (values) => {
  const value = values[0];
  let VALUES = '';
  if (value instanceof Array) {
    VALUES = values.map(valueForQuery).join(', ')
  } else {
    VALUES = valueForQuery(values);
  }
  return VALUES;
}

module.exports = {
  valueForQuery,
  valuesForQuery,
}
