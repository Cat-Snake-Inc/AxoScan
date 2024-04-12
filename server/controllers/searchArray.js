function formatArray(arrOfObjs) {
  const lineItems = arrOfObjs;

  const cleanName = (name) => name.replace(/[^a-z]/gi, '');
  function formatNumber(value, decimals = 2) {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : +num.toFixed(decimals);
  } // removes non-letters from item name
  const aggregatedData = lineItems.reduce((acc, el) => {
    // Use reduce to combine the data
    const name = cleanName(el.category);
    const value = formatNumber(el.total); // Assuming this is a string that needs to be converted to a number
    acc[name] = (acc[name] || 0) + (value >= 0 ? value : 0); // If the name already exists, add the value, otherwise, initialize it with the value
    return acc;
  }, {});
  console.log('obj', aggregatedData);
  const searchNameAndValue = Object.entries(aggregatedData).map(([type, value]) => ({
    // Convert the object to an array of objects with the correct keys and values
    type,
    value,
  }));
  return searchNameAndValue;
}

export default formatArray;
