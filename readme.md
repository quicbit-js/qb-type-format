# qb-type-format

Function for converting type objects or portions of 
type objects into more concise formats.

     
    var obj = {
        a: [ 1, 2, 3, { k: 'hi' } ],
        b: 'item b',
        c: { nested: 'object' }
    }
    
As plain JSON:
    
    console.log(JSON.stringify(obj, null, '  '))
    
    {
      "a": [
        1,
        2,
        3,
        {
          "k": "hi"
        }
      ],
      "b": "item b",
      "c": {
        "nested": "object"
      }
    }
    
As JSON that is pre-formatted (squish leaves into strings) 

    var format = require('qb-type-format')
    console.log(JSON.stringify(format(obj), null, '  '))
    
# install

npm i qb-type-format


