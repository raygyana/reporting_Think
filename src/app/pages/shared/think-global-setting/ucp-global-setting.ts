

export class UCPGlobalSettings {

      static UCP_UI_SETTING = {
            SALES_DECIR: {
                  revenueMethod: {
                        disabled: false
                  },
                  salesRep: {
                        disabled: true
                  }
            },

            ORDER_TYPE_UCP: {
                  orderType: {
                        disabled: true
                  }
            },

            PRODUCT_SEARCH: {
                  productCatg: {
                        visible: true
                  },
                  priceList: {
                        pubscriptionType: {
                              visible: true
                        }
                  }, FirstSearch: {
                        productCatg: {
                              visible: true
                        }
                  },
                  salesReport: {
                        priceType: {
                              visible: true
                        },
                        ISSNNumber: {
                              visible: false
                        }
                  }
            },
            topNCustomer: {
                  customerId: {
                        visible: false
                  }
            },

            YTDAmountByStartYear: {
                  defaultPara: {
                        dataInput: {
                              startDate: '2010-07-01',
                              endDate: '2016-07-18'
                        },
                        ngVolYear: ['2016'],
                        ngRevMethod: ['0'],
                        ngMarketSector: ['0'],
                        ngOrderStatus: ['-1'],
                        ngPaymentStatus: ['-1']
                  }

            }
            // endDate:2016-07-18
            // volumeYear:2016
            // marketSector:0
            // revenueMethod:0
            // orderStatus:-1
            // paymentStatus:-1
            ,
            YTDOrderByStartYear: {
                  defaultPara: {
                        dataInput: {
                              startDate: '2010-07-01',
                              endDate: '2016-07-18'
                        },
                        ngVolYear: ['2016'],
                        ngRevMethod: ['0'],
                        ngMarketSector: ['0'],
                        ngOrderStatus: ['-1'],
                        ngPaymentStatus: ['-1']
                  }

            }
            ,
            YTDOrderByCustomer: {
                  defaultPara: {
                        dataInput: {
                              startDate: '2010-07-01',
                              endDate: '2016-07-18'
                        },
                        ngVolYear: ['2016'],
                        ngRevMethod: ['0'],
                        ngMarketSector: ['0'],
                        ngOrderStatus: ['-1'],
                        ngPaymentStatus: ['-1']
                  }

            },
            CANCELLED_ORDERS: {
                  diffrentUrl: true
            }
      };



}
