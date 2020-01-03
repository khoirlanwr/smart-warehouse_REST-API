# PUBLISHER PROGRAM
# Author: 3TKB 2017
# Khoirul Anwar, Vardyansyah Cahya 

import redis
import json
import time
import traceback
from random import seed
from random import random
from pymongo import MongoClient
from datetime import datetime

if __name__ == '__main__':

    # Connect to local Redis instance
    r = redis.StrictRedis(host='54.90.63.207', port=6379)
    p = r.pubsub()

    print("[PUBLISH] Start")

    dbClient = MongoClient("mongodb://vian:vian@cluster0-shard-00-00-1cuic.mongodb.net:27017,cluster0-shard-00-01-1cuic.mongodb.net:27017,cluster0-shard-00-02-1cuic.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")

    db = dbClient["test"]
    collection_data = db["data_sensors"]
    print(dbClient.list_database_names())

    # q = collection_data.find().sort('_id', -1).limit(10)[0]['_id']
    # q = collection_data.find().sort('_id', -1).limit(1)    
    # print(q)

    # print(db.collection_data.find().skip(db.collection_data.count() - 10))
    # a = db.collection_data.find(10)
    # print(a)

    # cursor = db.measurements.find().sort([('timestamp', -1)]).limit(1)

    # id_data = 0
    isExist = False

    while(True):
        # seed(4)

        timestamp = datetime.now().strftime("%d/%m/%y %H:%M:%S")


        # id_data = id_data + 1
        value = random() * 10
        if value < 5:
            data = 0
            isExist = False
        else: 
            data = value
            isExist = True

        # PUBLISH START message on startScripts channel
        x = {
            # '_id': str(id_data),
            'data': str(data),
            'exist': str(isExist),
            'time': str(timestamp)
        }

        y = json.dumps(x)
        y.encode('utf-8')
        r.publish("dataSensor", y)
        # r.publish('data/Sensor', value)
        
        collection_data.insert_one(x)

        # r.set("dataSensor", y)y)
        print(y)

        time.sleep(10)


    print("Done")
