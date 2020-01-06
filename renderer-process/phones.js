module.exports = {
  splitUKPhoneData: function(phonesData, param, index) {
    var data = [];
    var c = 0;
    phonesData.forEach(item => {
      var lookup = item.destination.toString();
      var res = lookup.substr(0, index);
      if (res == param) {
        data.push(item);
      }
    });
    return data;
  },
  International_PhoneData: function(phonesData, index) {
    var data = [];
    phonesData.forEach(item => {
      var lookup = item.destination.toString();
      var res = lookup.substr(0, index);
      if (res != "44") {
        data.push(item);
      }
    });
    //console.log(data)
    return data;
  },

  dataSummary: function(data, type, arr) {
    let properties = new Set([arr]);
    // console.log(properties)
    if (type == "int") {
      var Type = parseInt;
    } else {
      var Type = parseFloat;
    }
    return extractProperties(data, properties).reduce(
      (a, b) => Type(a) + Type(b[arr] || 0),
      0
    );
  },

  convertToMinutes: function(data) {
    return Math.ceil(data / 60);
  }
};

/**
 *  UTILITY FUNCTION
 * @param {*} arr
 * @param {*} properties
 */
function extractProperties(arr, properties) {
  // console.log(arr)
  return arr.map(obj =>
    Object.keys(obj).reduce((acc, key) => {
      if (properties.has(key)) acc[key] = obj[key];
      return acc;
    }, {})
  );
}
