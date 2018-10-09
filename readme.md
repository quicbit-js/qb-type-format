# qb-type-format

Function for converting type objects or portions of 
type objects into concise strings.  The end result
is still valid JSON, but with some objects converted
to flat-strings.  

For example:

    var format = require('qb-type-format')
    
    var obj = {
        a: [ 'string', 'foo', { k: 'hi' } ],
        b: 'item b',
        c: { nested: 'object' }
    }
    
    console.log('Plain', JSON.stringify(obj, null, '  '))
    console.log('Formatted', JSON.stringify(format(obj), null, '  '))
    
Outputs:
    
    Plain: {
      "a": [
        "string",
        "foo",
        {
          "k": "hi"
        }
      ],
      "b": "item b",
      "c": {
        "nested": "object"
      }
    }
    Formatted: {
      "a": "[string,foo,{k:hi}]",
      "b": "item b",
      "c": "{nested:object}"
    }
    
# install

npm i qb-type-format


