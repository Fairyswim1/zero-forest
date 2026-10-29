export const levels=[
  {
    "name": "목표가 바뀌어요",
    "note": "먼저 +2와 −2로 0을 만들어요. 다음 목표는 +3이에요.",
    "targets": [
      0,
      3
    ],
    "board": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      2,
      -2,
      1,
      2
    ],
    "cols": 4,
    "rows": 3
  },
  {
    "name": "다음 돌을 남겨요",
    "note": "+3을 만드는 길은 여러 개예요. 다음 −2에 쓸 돌도 남겨 보세요.",
    "targets": [
      3,
      -2
    ],
    "board": [
      null,
      null,
      null,
      null,
      4,
      2,
      -3,
      1,
      1,
      1,
      2,
      2
    ],
    "cols": 4,
    "rows": 3
  },
  {
    "name": "넓어진 숲길",
    "note": "돌이 14개로 늘었어요. 마지막 −8에 필요한 음수를 남겨 보세요.",
    "cols": 5,
    "rows": 4,
    "targets": [
      3,
      -8
    ],
    "board": [
      null,
      null,
      null,
      null,
      null,
      null,
      6,
      4,
      1,
      6,
      1,
      1,
      4,
      4,
      2,
      6,
      1,
      3,
      -4,
      -4
    ],
    "bad": [
      12,
      17,
      18
    ]
  },
  {
    "name": "세 번의 약속",
    "note": "같은 합도 어떤 돌을 쓰느냐가 중요해요. 다음 두 목표를 살펴보세요.",
    "cols": 5,
    "rows": 4,
    "targets": [
      3,
      5,
      -8
    ],
    "board": [
      1,
      4,
      3,
      1,
      4,
      4,
      6,
      4,
      1,
      1,
      1,
      6,
      1,
      5,
      4,
      5,
      3,
      2,
      -4,
      -4
    ],
    "bad": [
      13,
      18,
      17
    ]
  },
  {
    "name": "내려온 뒤의 만남",
    "note": "0을 만들 때 어느 −4를 쓸까요? 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      0,
      3,
      5,
      -8
    ],
    "board": [
      null,
      null,
      null,
      null,
      null,
      null,
      2,
      4,
      5,
      1,
      6,
      1,
      6,
      3,
      6,
      3,
      6,
      4,
      3,
      2,
      3,
      2,
      2,
      -4,
      6,
      2,
      2,
      4,
      -4,
      -4
    ],
    "bad": [
      27,
      28
    ]
  },
  {
    "name": "숲을 밝히는 순서",
    "note": "목표는 다섯 개! 양수와 음수, 낙하 후 이웃까지 함께 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      3,
      0,
      -2,
      5,
      -8
    ],
    "board": [
      5,
      3,
      5,
      6,
      5,
      2,
      5,
      4,
      4,
      3,
      5,
      2,
      1,
      4,
      6,
      1,
      2,
      -4,
      6,
      4,
      4,
      3,
      1,
      -4,
      4,
      2,
      6,
      3,
      -4,
      -4
    ],
    "bad": [
      16,
      22
    ]
  },
  {
    "name": "두 빛 사이",
    "note": "같은 목표를 만드는 길이 여럿이에요. 뒤의 목표에 쓸 돌을 남겨 보세요.",
    "cols": 5,
    "rows": 4,
    "targets": [
      4,
      2,
      -6
    ],
    "board": [
      null,
      null,
      null,
      null,
      null,
      5,
      6,
      6,
      3,
      3,
      6,
      3,
      1,
      1,
      3,
      2,
      5,
      -3,
      -3,
      1
    ],
    "bad": [
      7,
      12,
      17
    ],
    "solution": [
      [
        14,
        19
      ],
      [
        12,
        13
      ],
      [
        17,
        18
      ]
    ],
    "decision": "reserve-for-future",
    "designEvidence": {
      "goodFirst": [
        14,
        19
      ],
      "badFirst": [
        7,
        12,
        17
      ],
      "sameValues": false,
      "tries": 9
    }
  },
  {
    "name": "세 돌의 약속",
    "note": "같은 목표를 만드는 길이 여럿이에요. 뒤의 목표에 쓸 돌을 남겨 보세요.",
    "cols": 5,
    "rows": 4,
    "targets": [
      6,
      5,
      -8
    ],
    "board": [
      1,
      2,
      5,
      6,
      6,
      5,
      5,
      4,
      3,
      4,
      1,
      4,
      -4,
      -4,
      4,
      4,
      4,
      6,
      4,
      5
    ],
    "bad": [
      5,
      10,
      11,
      12
    ],
    "solution": [
      [
        0,
        5
      ],
      [
        10,
        11
      ],
      [
        12,
        13
      ]
    ],
    "decision": "reserve-for-future",
    "designEvidence": {
      "goodFirst": [
        0,
        5
      ],
      "badFirst": [
        5,
        10,
        11,
        12
      ],
      "sameValues": false,
      "tries": 8
    }
  },
  {
    "name": "작은 수의 자리",
    "note": "같은 목표를 만드는 길이 여럿이에요. 뒤의 목표에 쓸 돌을 남겨 보세요.",
    "cols": 5,
    "rows": 4,
    "targets": [
      4,
      6,
      -10
    ],
    "board": [
      3,
      1,
      5,
      3,
      6,
      2,
      6,
      -5,
      1,
      2,
      3,
      1,
      -5,
      5,
      3,
      4,
      6,
      6,
      2,
      6
    ],
    "bad": [
      0,
      1,
      2,
      7
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        3,
        8,
        9
      ],
      [
        7,
        12
      ]
    ],
    "decision": "reserve-for-future",
    "designEvidence": {
      "goodFirst": [
        0,
        1
      ],
      "badFirst": [
        0,
        1,
        2,
        7
      ],
      "sameValues": false,
      "tries": 2
    }
  },
  {
    "name": "남겨 둔 한 송이",
    "note": "같은 목표를 만드는 길이 여럿이에요. 뒤의 목표에 쓸 돌을 남겨 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      5,
      6,
      -6
    ],
    "board": [
      2,
      3,
      4,
      6,
      4,
      5,
      1,
      4,
      5,
      6,
      2,
      6,
      2,
      1,
      -3,
      1,
      6,
      2,
      1,
      1,
      4,
      5,
      6,
      5,
      4,
      6,
      1,
      -3,
      2,
      2
    ],
    "bad": [
      1,
      7,
      13,
      14
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        19,
        20,
        26
      ],
      [
        26,
        27
      ]
    ],
    "decision": "reserve-for-future",
    "designEvidence": {
      "goodFirst": [
        0,
        1
      ],
      "badFirst": [
        1,
        7,
        13,
        14
      ],
      "sameValues": false,
      "tries": 5
    }
  },
  {
    "name": "긴 길과 짧은 길",
    "note": "같은 목표를 만드는 길이 여럿이에요. 뒤의 목표에 쓸 돌을 남겨 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      6,
      4,
      -8
    ],
    "board": [
      4,
      4,
      1,
      4,
      1,
      3,
      5,
      1,
      5,
      6,
      6,
      3,
      2,
      5,
      4,
      3,
      -4,
      5,
      6,
      5,
      5,
      5,
      1,
      6,
      4,
      5,
      5,
      6,
      -4,
      3
    ],
    "bad": [
      2,
      1,
      7
    ],
    "solution": [
      [
        21,
        22
      ],
      [
        10,
        11
      ],
      [
        22,
        28
      ]
    ],
    "decision": "reserve-for-future",
    "designEvidence": {
      "goodFirst": [
        21,
        22
      ],
      "badFirst": [
        2,
        1,
        7
      ],
      "sameValues": false,
      "tries": 4
    }
  },
  {
    "name": "잔빛의 꽃",
    "note": "같은 목표를 만드는 길이 여럿이에요. 뒤의 목표에 쓸 돌을 남겨 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      3,
      5,
      2,
      -10
    ],
    "board": [
      6,
      3,
      4,
      1,
      2,
      2,
      3,
      3,
      3,
      1,
      4,
      6,
      4,
      1,
      3,
      4,
      1,
      6,
      1,
      1,
      -5,
      6,
      5,
      2,
      3,
      4,
      -5,
      6,
      1,
      3
    ],
    "bad": [
      9,
      15,
      14,
      20
    ],
    "solution": [
      [
        3,
        4
      ],
      [
        9,
        10
      ],
      [
        13,
        19
      ],
      [
        20,
        26
      ]
    ],
    "decision": "reserve-for-future",
    "designEvidence": {
      "goodFirst": [
        3,
        4
      ],
      "badFirst": [
        9,
        15,
        14,
        20
      ],
      "sameValues": false,
      "tries": 12
    }
  },
  {
    "name": "위에서 내려온 빛",
    "note": "같은 수를 골라도 자리에 따라 달라져요. 돌이 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      0,
      5,
      6,
      -6
    ],
    "board": [
      null,
      null,
      null,
      null,
      null,
      null,
      3,
      2,
      3,
      -3,
      1,
      6,
      -3,
      2,
      5,
      1,
      2,
      1,
      2,
      6,
      4,
      4,
      1,
      2,
      3,
      4,
      4,
      1,
      -3,
      2
    ],
    "bad": [
      8,
      9
    ],
    "solution": [
      [
        6,
        12
      ],
      [
        7,
        8
      ],
      [
        15,
        21,
        27
      ],
      [
        27,
        28
      ]
    ],
    "decision": "same-values-different-position",
    "designEvidence": {
      "goodFirst": [
        6,
        12
      ],
      "badFirst": [
        8,
        9
      ],
      "sameValues": true,
      "tries": 28
    }
  },
  {
    "name": "엇갈린 두 줄",
    "note": "같은 수를 골라도 자리에 따라 달라져요. 돌이 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      0,
      3,
      6,
      -8
    ],
    "board": [
      3,
      6,
      4,
      4,
      3,
      4,
      -4,
      4,
      4,
      -4,
      1,
      1,
      2,
      2,
      1,
      2,
      -4,
      5,
      5,
      6,
      3,
      6,
      4,
      5,
      1,
      6,
      4,
      3,
      5,
      2
    ],
    "bad": [
      3,
      9
    ],
    "solution": [
      [
        6,
        7
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        16
      ]
    ],
    "decision": "same-values-different-position",
    "designEvidence": {
      "goodFirst": [
        6,
        7
      ],
      "badFirst": [
        3,
        9
      ],
      "sameValues": true,
      "tries": 6
    }
  },
  {
    "name": "같은 수 다른 자리",
    "note": "같은 수를 골라도 자리에 따라 달라져요. 돌이 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      0,
      3,
      3,
      -10
    ],
    "board": [
      1,
      4,
      6,
      3,
      4,
      2,
      5,
      2,
      3,
      3,
      3,
      6,
      1,
      3,
      6,
      -5,
      -5,
      6,
      6,
      3,
      2,
      5,
      5,
      5,
      5,
      2,
      1,
      6,
      5,
      -5
    ],
    "bad": [
      15,
      21
    ],
    "solution": [
      [
        23,
        29
      ],
      [
        25,
        26
      ],
      [
        12,
        13
      ],
      [
        15,
        16
      ]
    ],
    "decision": "same-values-different-position",
    "designEvidence": {
      "goodFirst": [
        23,
        29
      ],
      "badFirst": [
        15,
        21
      ],
      "sameValues": true,
      "tries": 8
    }
  },
  {
    "name": "한 칸의 여유",
    "note": "같은 수를 골라도 자리에 따라 달라져요. 돌이 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      0,
      5,
      6,
      -6
    ],
    "board": [
      5,
      1,
      3,
      6,
      5,
      2,
      6,
      3,
      1,
      2,
      4,
      5,
      1,
      2,
      3,
      3,
      6,
      5,
      4,
      -3,
      6,
      3,
      -3,
      -3,
      1,
      4,
      4,
      5,
      1,
      2
    ],
    "bad": [
      22,
      28,
      29
    ],
    "solution": [
      [
        12,
        13,
        19
      ],
      [
        8,
        14,
        13
      ],
      [
        9,
        10
      ],
      [
        22,
        23
      ]
    ],
    "decision": "same-values-different-position",
    "designEvidence": {
      "goodFirst": [
        12,
        13,
        19
      ],
      "badFirst": [
        22,
        28,
        29
      ],
      "sameValues": true,
      "tries": 7
    }
  },
  {
    "name": "마지막 꽃봉오리",
    "note": "같은 수를 골라도 자리에 따라 달라져요. 돌이 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      0,
      4,
      5,
      -8
    ],
    "board": [
      1,
      4,
      1,
      2,
      3,
      6,
      5,
      1,
      1,
      4,
      -4,
      1,
      6,
      3,
      1,
      -4,
      1,
      4,
      3,
      2,
      3,
      3,
      4,
      6,
      1,
      4,
      5,
      -4,
      1,
      1
    ],
    "bad": [
      13,
      14,
      15
    ],
    "solution": [
      [
        4,
        10,
        11
      ],
      [
        14,
        20
      ],
      [
        14,
        20,
        21
      ],
      [
        21,
        27
      ]
    ],
    "decision": "same-values-different-position",
    "designEvidence": {
      "goodFirst": [
        4,
        10,
        11
      ],
      "badFirst": [
        13,
        14,
        15
      ],
      "sameValues": true,
      "tries": 1
    }
  },
  {
    "name": "숲이 피어나는 날",
    "note": "같은 수를 골라도 자리에 따라 달라져요. 돌이 내려온 뒤의 이웃을 생각해 보세요.",
    "cols": 6,
    "rows": 5,
    "targets": [
      3,
      0,
      4,
      5,
      -10
    ],
    "board": [
      1,
      3,
      2,
      4,
      1,
      4,
      1,
      1,
      1,
      -5,
      2,
      5,
      6,
      3,
      -5,
      5,
      4,
      6,
      2,
      -5,
      1,
      6,
      1,
      6,
      4,
      6,
      4,
      3,
      2,
      3
    ],
    "bad": [
      22,
      28
    ],
    "solution": [
      [
        2,
        8
      ],
      [
        13,
        19,
        18
      ],
      [
        12,
        13
      ],
      [
        27,
        28
      ],
      [
        14,
        15
      ]
    ],
    "decision": "same-values-different-position",
    "designEvidence": {
      "goodFirst": [
        2,
        8
      ],
      "badFirst": [
        22,
        28
      ],
      "sameValues": true,
      "tries": 7
    }
  }
];
