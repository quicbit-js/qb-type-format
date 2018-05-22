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

function err (msg) { throw Error(msg) }
function format_arr (a, sep, paren, opt) {
    var ret = a.map(function (v) { return format_any(v, opt) })
    if (ret.find(function (v) { return typeof v !== 'string' })) {
        return ret
    }
    var len = ret.reduce (function (s, v) { return s + v.length }, 0)
    if (paren) { len += 2 }
    if (len + ((a.length-1) * sep.length) > opt.str_lim) {
        return ret
    }
    ret = ret.join(sep)
    return paren ? '[' + ret + ']' : ret
}

function format_any (v, opt) {
    if (typeof v === 'string') {
        return v
    }
    typeof v === 'object' || err('unexpected type')
    if (Array.isArray(v)) {
        return format_arr(v, ',', true, opt)
    } else {
        return format_obj(v, opt)
    }
}

function format_obj (obj, opt) {
    var keys = Object.keys(obj)
    if (keys.length === 0) {
        return opt.str_lim >= 2 ? '{}' : {}
    }
    var ret
    if (keys[0] === '$mul') {
        ret = format_arr(obj.$mul, ' | ', false, opt)                      // e.g.  "obj|str|[num]"
        return (typeof ret === 'string') ? ret : { $mul: ret }
    } else {
        var vals = []
        var all_str = true
        keys.forEach(function (k) {
            var v = format_any(obj[k], opt)
            if (typeof v !== 'string') {
                all_str = false
            }
            vals.push(v)
        })
        if (all_str) {
            var len = keys.length - 1   // space for commas
            len += keys.reduce(function (s, k) { return s + k.length }, 0)
            len += vals.reduce(function (s, v) { return s + v.length }, 0)
            if (len <= opt.str_lim - 1) {
                var pairs = []
                for (var pi=0; pi<keys.length; pi++) {
                    pairs.push(keys[pi] + ':' + vals[pi])
                }
                return '{' + pairs.join(',') + '}'
            }
        }
        ret = {}
        for (var i=0; i<keys.length; i++) {
            ret[keys[i]] = vals[i]
        }
        return ret
    }
}

module.exports = format_any
