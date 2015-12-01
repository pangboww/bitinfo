# -*- coding: utf-8 -*-
import scrapy
import json

from bitinfo.items import BitinfoItem

class HuobiSpider(scrapy.Spider):
    name = "huobi"
    allowed_domains = ["huobi.com"]
    start_urls = (
        'http://api.huobi.com/staticmarket/ticker_btc_json.js',
    )

    def parse(self, response):
        jsonresponse = json.loads(response.body_as_unicode())


        item = BitinfoItem()
        item["market"] = "huobi"
        item["date"] = jsonresponse["time"]
        item["high"] = jsonresponse["ticker"]["high"]
        item["low"] = jsonresponse["ticker"]["low"]
        item["buy"] = jsonresponse["ticker"]["buy"]
        item["sell"] = jsonresponse["ticker"]["sell"]
        item["last"] = jsonresponse["ticker"]["last"]
        item["vol"] = jsonresponse["ticker"]["vol"]
        item["vwap"] = ""
        item["prev_close"] = ""
        item["open"] = jsonresponse["ticker"]["open"]
        yield item
