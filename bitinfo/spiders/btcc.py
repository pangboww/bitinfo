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
        item["time"] = int(jsonresponse["ticker"]["date"]) / 60 * 60
        item["high"] = float(jsonresponse["ticker"]["high"])
        item["low"] = float(jsonresponse["ticker"]["low"])
        item["buy"] = float(jsonresponse["ticker"]["buy"])
        item["sell"] = float(jsonresponse["ticker"]["sell"])
        item["last"] = float(jsonresponse["ticker"]["last"])
        item["vol"] = float(jsonresponse["ticker"]["vol"])
        item["vwap"] = float(jsonresponse["ticker"]["vwap"])
        item["prev_close"] = float(jsonresponse["ticker"]["prev_close"])
        item["open"] = float(jsonresponse["ticker"]["open"])
        yield item

