import moment from "moment"
import { I18n } from 'react-redux-i18n'

const titleBad = [
    {
        label: "Tất cả",
        tabBad: 'all'
    },
    {
        label: "Giường gỗ hiện đại",
        tabBad: '0'
    },
    {
        label: "Giường gỗ cổ điển",
        tabBad: '1'
    },
    {
        label: "Giường gỗ tự tiên",
        tabBad: '2'
    },
    {
        label: "Giường gỗ công nghiệp",
        tabBad: '3'
    },
]
const titleTableEat = [
    {
        label: "Tất cả",
        tabBad: 'all'
    },
    {
        label: "Bàn ăn hiện đại",
        tabBad: '0'
    },
    {
        label: "Bàn ăn cổ điển",
        tabBad: '1'
    },
    {
        label: "Bàn ăn hiện đại 4 ghế",
        tabBad: '2'
    },
    {
        label: "Bàn ăn hiện đại 6 ghế",
        tabBad: '3'
    },
    {
        label: "Bàn ăn hiện đại 8 ghế",
        tabBad: '4'
    },
    {
        label: "Bàn ăn hiện đại tròn",
        tabBad: '5'
    },
]
const titleWardrobe = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Tủ quần áo hiện đại",
      tabBad: '0'
   },
   {
      label: "Tủ quần áo gỗ tự nhiên",
      tabBad: '1'
   },
   {
      label: "Tủ quần áo gỗ công nghiệp",
      tabBad: '2'
   },
   {
      label: "Tủ quần áo nhựa cao cấp",
      tabBad: '3'
   },
]
const titleTableLivingRoom = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Bàn trà phòng khách hiện đại",
      tabBad: '0'
   },
   {
      label: "Bàn trà phòng khách cổ điển",
      tabBad: '1'
   },
]
const titleShoesCabinet = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Tủ giày hiện đại",
      tabBad: '0'
   },
   {
      label: "Tủ giày gỗ tự nhiên",
      tabBad: '1'
   },
   {
      label: "Tủ giày gỗ công nghiệp",
      tabBad: '2'
   }
]
const titleTVCabinet = [
   {
      label: "Tất cả",
      tabBad: 'all'
   },
   {
      label: "Tủ kệ Tivi hiện đại",
      tabBad: '0'
   },
   {
      label: "Tủ kệ tivi cổ điển",
      tabBad: '1'
   },
   {
      label: "Tủ kệ tivi gỗ tự nhiên",
      tabBad: '2'
   },
   {
      label: "Tủ kệ tivi gỗ công nghiệp",
      tabBad: '3'
   },
]
const titleTableRestaurant = [
    {
        label: "Tất cả",
        tabBad: 'all'
    },
    {
        label: "Bàn ăn hiện đại",
        tabBad: '0'
    },
    {
        label: "Bàn ăn cổ điển",
        tabBad: '1'
    },
    {
        label: "Bàn ăn hiện đại 4 ghế",
        tabBad: '2'
    },
    {
        label: "Bàn ăn hiện đại 6 ghế",
        tabBad: '3'
    },
    {
        label: "Bàn ăn hiện đại 8 ghế",
        tabBad: '4'
    },
    {
        label: "Bàn ăn hiện đại tròn",
        tabBad: '5'
    },
]
const typeGoods = [
  {
    name: "Bàn ăn nhà hàng",
    value: "6",
    typeItem: [
      {
        name: "Bàn ăn hiện đại",
        value: "0"
      },
      {
        name: "Bàn ăn cổ điển",
        value: "1"
      },
      {
        name: "Bàn ăn 6 ghế",
        value: "2"
      },
      {
        name: "Bàn ăn 8 ghế",
        value: "3"
      },
      {
        name: "Bàn ăn tròn",
        value: "54"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      }
    ]
  }, {
    name: "Bàn ăn",
    value: "1",
    typeItem: [
      {
        name: "Bàn ăn hiện đại",
        value: "0"
      },
      {
        name: "Bàn ăn cổ điển",
        value: "1"
      },
      {
        name: "Bàn ăn 4 ghế",
        value: "2"
      },
      {
        name: "Bàn ăn 6 ghế",
        value: "3"
      },
      {
        name: "Bàn ăn 8 ghế",
        value: "4"
      },
      {
        name: "Bàn ăn tròn",
        value: "5"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      }
    ]
  }, {
    name: "Tủ Quần áo",
    value: "2",
    typeItem: [
      {
        name: "Tủ quần áo hiện đại",
        value: "0"
      },
      {
        name: "Tủ quần áo gỗ tự nhiên",
        value: "1"
      },
      {
        name: "Tủ quần áo gỗ công nghiệp",
        value: "2"
      },
      {
        name: "Tủ quần áo nhựa cao cấp",
        value: "3"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      },
      {
        name: "Nhựa cao cấp",
        value: "3"
      }
    ]
  }, {
    name: "Bàn trà phòng khách",
    value: "3",
    typeItem: [
      {
        name: "Bàn trà hiện đại",
        value: "0"
      },
      {
        name: "Bàn trà cổ điển",
        value: "1"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      }
    ]
  }, {
    name: "Tủ giày",
    value: "4",
    typeItem: [
      {
        name: "Tủ giày hiện đại",
        value: "0"
      },
      {
        name: "Tủ giày gỗ tự nhiên",
        value: "1"
      },
      {
        name: "Tủ giày gỗ công nghiệp",
        value: "1"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      }
    ]
  }, {
    name: "Giường ngủ",
    value: "0",
    typeItem: [
      {
        name: "Giường ngủ hiện đại",
        value: "0"
      },
      {
        name: "Giường ngủ cổ điển",
        value: "1"
      },
      {
        name: "Giường ngủ gỗ tự nhiên cao cấp",
        value: "2"
      },
      {
        name: "Giường ngủ gỗ công nghiệp",
        value: "3"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      },
      {
        name: "Nhựa cao cấp",
        value: "3"
      }
    ]
  }, {
    name: "Tủ kệ tivi",
    value: "5",
    typeItem: [
      {
        name: "Tủ kệ tivi hiện đại",
        value: "0"
      },
      {
        name: "Tủ kệ tivi cổ điển",
        value: "1"
      },
      {
        name: "Tủ kệ tivi gỗ tự nhiên",
        value: "2"
      },
      {
        name: "Tủ kệ tivi gỗ công nghiệp",
        value: "3"
      }
    ],
    typeWoods: [
      {
        name: "Sồi nga",
        value: "0"
      },
      {
        name: "Xoan đào",
        value: "1"
      },
      {
        name: "Gỗ công nghiệp",
        value: "2"
      }
    ]
  }
]



export { 
  typeGoods,
  titleTableRestaurant,
  titleBad,
  titleTableEat,
  titleWardrobe,
  titleTableLivingRoom,
  titleShoesCabinet,
  titleTVCabinet,
  

}
