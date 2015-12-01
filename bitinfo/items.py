# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field

class BitinfoItem(scrapy.Item):
    market = Field()
    date = Field()
    high = Field()
    low = Field()
    buy = Field()
    sell = Field()
    last = Field()
    vol = Field()
    vwap = Field()
    prev_close = Field()
    open = Field()
