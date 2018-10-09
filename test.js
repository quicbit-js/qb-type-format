// Software License Agreement (ISC License)
//
// Copyright (c) 2018, Matthew Voss
//
// Permission to use, copy, modify, and/or distribute this software for
// any purpose with or without fee is hereby granted, provided that the
// above copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var test = require('test-kit').tape()
var format = require('.')

test('basic', function (t) {
    t.table_assert([
        [ 'v',    'opt',  'exp' ],
        [ 'str',   {str_lim: 20},       'str' ],
        [ ['num'],   {str_lim: 20},       '[num]' ],
        [ {},   {str_lim: 2},       '{}' ],
        [ {},   {str_lim: 1},       {} ],
        [ {a:{}},   {str_lim: 20},       '{a:{}}' ],
        [ {a:'num'},   {str_lim: 20},       '{a:num}' ],

    ], format )
})

test('nested', function (t) {
    t.table_assert([
        [ 'v',    'opt',  'exp' ],
        [ {a:['num']},   {str_lim: 20},       '{a:[num]}' ],
        [ {a:['num', 'b']},   {str_lim: 20},     '{a:[num,b]}' ],
        [ {a:['num', 'b']},   {str_lim: 6},       { a: [ 'num', 'b' ] } ],
        [ {a:['num', 'b']},   {str_lim: 7},       { a: '[num,b]' } ],

        [ [{a:['num', 'b']}],   {str_lim: 6},       [{ a: [ 'num', 'b' ] }] ],
    ], format )
})

test('multi', function (t) {
    t.table_assert([
        [ 'v',    'opt',  'exp' ],
        [ {$mul:['num']},   {str_lim: 20},       'num' ],
        [ {$mul:['num', 'str']},   {str_lim: 20},       'num | str' ],
        [ {$mul:['num', 'str']},   {str_lim: 4},       { $mul: [ 'num', 'str' ] } ],
    ], format )
})

test('error', function (t) {
    t.table_assert([
        [ 'v',   'opt', 'exp' ],
        [ 3,     null,  /unexpected type/ ],
        [ [true],     null,  /unexpected type/ ],
    ], format, {assert: 'throws'})
})



var obj = {
    a: [ 'string', 'foo', { k: 'hi' } ],
    b: 'item b',
    c: { nested: 'object' }
}

console.log('Plain:', JSON.stringify(obj, null, '  '))
console.log('Formatted:', JSON.stringify(format(obj), null, '  '))