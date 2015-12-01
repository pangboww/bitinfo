# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from pymongo import MongoClient

from scrapy.conf import settings
from scrapy.exceptions import DropItem
from scrapy import log

class BitinfoPipeline(object):
    def __init__(self):
        uri = "mongodb://pangboww:pb3133962@ds061354.mongolab.com:61354/bitinfo"
        client = MongoClient(settings['MONGODB_URI'])
        self.db = client[settings['MONGODB_DB']]
        


    def process_item(self, item, spider):
        valid = True
        if not item:
            valid = False
            raise DropItem("Missing {0}!".format(item))

        if item["market"] == "btcc":
            self.collection = self.db[settings['MONGODB_COLLECTION_BTCC']]
        elif item["market"] == "huobi":
            self.collection = self.db[settings['MONGODB_COLLECTION_HUOBI']]
        else:
            valid = False
            raise DropItem("Wrong market {0}!".format(item))

        if valid:
            self.collection.insert(dict(item))
            log.msg("New data added to database!",
                    level=log.DEBUG, spider=spider)
        return item
