# -*- coding: utf-8 -*-
import scrapy
import json

from bitinfo.items import BitinfoItem


class BtccSpider(scrapy.Spider):
    name = "btcc"
    allowed_domains = ["btcc.com"]
    start_urls = (
        'https://data.btcchina.com/data/ticker?market=btccny',
    )

    def parse(self, response):
        jsonresponse = json.loads(response.body_as_unicode())

        item = BitinfoItem()
        item["market"] = "btcc"
        item["date"] = jsonresponse["ticker"]["date"]
        item["high"] = jsonresponse["ticker"]["high"]
        item["low"] = jsonresponse["ticker"]["low"]
        item["buy"] = jsonresponse["ticker"]["buy"]
        item["sell"] = jsonresponse["ticker"]["sell"]
        item["last"] = jsonresponse["ticker"]["last"]
        item["vol"] = jsonresponse["ticker"]["vol"]
        item["vwap"] = jsonresponse["ticker"]["vwap"]
        item["prev_close"] = jsonresponse["ticker"]["prev_close"]
        item["open"] = jsonresponse["ticker"]["open"]
        yield item

