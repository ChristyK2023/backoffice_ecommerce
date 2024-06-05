export const formateTCamelCase = (name: String) => {
  return name.charAt(0).toUpperCase()+name.slice(1)
}

export const generateId = () => {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}
