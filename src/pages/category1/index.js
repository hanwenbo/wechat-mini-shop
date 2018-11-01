import GoodsCategoryModel from "../../models/goodsCategory";
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import fa from "../../utils/fa";
import ShopModel from '../../models/shop'

const shopModel = new ShopModel()
const goodsCategoryModel = new GoodsCategoryModel()
Page({
    data: {
        categoryList: null,
        mainNavClickIndex: 0,
        categoryId: null,
    },
    async onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        // 店铺配置信息
        const result = await shopModel.info()
        if (result) {
            fa.cache.set('shop_info', result)
            this.init()
        }
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    async init() {
        const categoryListResult = await goodsCategoryModel.list()
        const categoryList = categoryListResult.list
        this.setData({
            categoryList,
        })
    },
    mainNavTap: function (e) {
        this.setData({
            mainNavClickIndex: e.currentTarget.dataset.index
        })
    },
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    },
})
