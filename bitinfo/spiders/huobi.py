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
        item["time"] = int(jsonresponse["time"]) / 60 * 60
        item["high"] = float(jsonresponse["ticker"]["high"])
        item["low"] = float(jsonresponse["ticker"]["low"])
        item["buy"] = float(jsonresponse["ticker"]["buy"])
        item["sell"] = float(jsonresponse["ticker"]["sell"])
        item["last"] = float(jsonresponse["ticker"]["last"])
        item["vol"] = float(jsonresponse["ticker"]["vol"])
        item["open"] = float(jsonresponse["ticker"]["open"])
        yield item
