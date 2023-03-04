const randomNum = () => {
  const max = 10;
  const min = -10;
  return (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) % (max - min + 1)) + min
}

const randEl = () => {
  const num = randomNum()
  const plus = true || Math.round(Math.random())
  return plus ? num : -num
}

const randomMatrix = () => {
  return Array(9).fill(0).map(() => randEl())
}

const g = (x) => {
  if (typeof x === 'object') {
    return x.val
  } else if (Array.isArray(x)) {
    return calc(x).val
  }
  return m[x]
}

const calc = (op) => {
  let res;

  if (op[0] === '+') {
    res = g(op[1][0]) + g(op[1][1])
  } else if (op[0] === '*') {
    res = g(op[1][0]) + '*' + g(op[1][1])
  }

  return {
    val: res
  }
}

const expandMatrix = (matrix) => {
  // matrix = [
  //   'a', 'b', 'c',
  // // 0,   1,  2
  //   'd', 'e', 'f',
  // // 3,   4,  5
  //   'i', 'j', 'k'
  // // 6,   7,  8
  // ]

  const execute = ({ type, items, idx }) => {
    let ans;

    if (type === 'sum') {
      ans = 0
      items.forEach(([sign, data]) => {
        ans += (sign === '+' ? 1 : -1) * execute(data)
      })
    } else if (type === '*') {
      ans = 1
      items.forEach((data) => {
        ans *= execute(data)
      })
    } else if (type === 'mel') {
      ans = matrix[idx]
    }

    return ans
  }

  const task = {
    type: 'sum',
    items: [
      ['+', {
        type: '*',
        items: [
          { type: 'mel', idx: 0 },
          {
            type: 'sum',
            items: [
              ['+', {
                type: '*',
                items: [
                  { type: 'mel', idx: 4 },
                  { type: 'mel', idx: 8 }
                ]
              }],
              ['-', {
                type: '*',
                items: [
                  { type: 'mel', idx: 7 },
                  { type: 'mel', idx: 5 }
                ]
              }]
            ]
          }
        ]
      }],

      ['-', {
        type: '*',
        items: [
          { type: 'mel', idx: 1 },
          {
            type: 'sum',
            items: [
              ['+', {
                type: '*',
                items: [
                  { type: 'mel', idx: 3 },
                  { type: 'mel', idx: 8 }
                ]
              }],
              ['-', {
                type: '*',
                items: [
                  { type: 'mel', idx: 6 },
                  { type: 'mel', idx: 5 }
                ]
              }]
            ]
          }
        ]
      }],

      ['+', {
        type: '*',
        items: [
          { type: 'mel', idx: 2 },
          {
            type: 'sum',
            items: [
              ['+', {
                type: '*',
                items: [
                  { type: 'mel', idx: 3 },
                  { type: 'mel', idx: 7 }
                ]
              }],
              ['-', {
                type: '*',
                items: [
                  { type: 'mel', idx: 6 },
                  { type: 'mel', idx: 4 }
                ]
              }]
            ]
          }
        ]
      }],
    ]
  }

  return execute(task)
}

const generate = () => {
  const matrix = randomMatrix();

  [...document.querySelector('.grid').children].forEach((ch, idx) => {
    ch.innerHTML = matrix[idx]
  })

  const ansEl = document.querySelector('#ans')

  ansEl.innerHTML = expandMatrix(matrix)
}

generate()

document.querySelector('#gen').addEventListener('click', () => {
  generate()
})
