let filterBy = function (originalArr, fieldName, value) {
  if (!value) return originalArr || []
  const returnVal = originalArr.filter((elem) => {
      return (elem[fieldName].toLowerCase()).indexOf(value.toLowerCase()) !== -1
    })
  return returnVal;
}

export default filterBy
