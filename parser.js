const fs = require('fs')
const convert = require('xml-js')

const xml = fs.readFileSync('Hotels.xml', 'utf8')
const obj = convert.xml2js(xml, { compact: true, alwaysChildren: true })

let json = {
  Lists: {
    Names: { Name: [] },
    Prices: { Price: [] },
    Addresses: { Address: [] },
  },
}

const obj2xml = (obj) => {
  for (let el in obj) {
    if (
      (obj[el].Name._text.includes('Hilton') &&
        obj[el].Address.State._text.toLowerCase().includes('ny')) ||
      obj[el].Address.State._text.toLowerCase().includes('new york')
    ) {
      json.Lists.Names.Name.push(obj[el].Name._text)
      json.Lists.Prices.Price.push(obj[el]._attributes.Price)
      json.Lists.Addresses.Address.push(obj[el].Address.AddressLine._text)
    } else {
      console.log('no')
    }
  }
  return json
}

const result = convert.js2xml(obj2xml(obj.Hotels.Hotel), {
  compact: true,
  spaces: 4,
})

fs.writeFileSync('newXml.xml', result)
