# -*- coding: utf-8 -*-
from tinydb import TinyDB, Query
from constants import dbPath

db = TinyDB(dbPath)


def getAllPasswordItem(mobile):
    query = Query()
    return db.search( (query.tag == 'passwordItem') & (query.mobile==mobile) )

def save(item):
    db.insert(item.__dict__)


def getUserByMobile(mobile):
    query = Query()
    return db.get( (query.tag == 'user') & (query.mobile == mobile))

def containsUser(mobile):
    query = Query()
    return db.contains( (query.tag == 'user') & (query.mobile == mobile) )


def getAllSiteConfigs():
    query=Query()
    return db.search(query.tag=='site_config')

def containsSiteConfig(site_name):
    query = Query()
    return db.contains( (query.tag == 'site_config') & (query.site_name == site_name) )

def getSiteByName(site_name):
    query=Query()
    return db.get( (query.tag=='site_config') & (query.site_name == site_name ) )

def getById(id):
    return db.get( eid=int(id) )



def remove(tag) :
    query = Query()
    db.remove(query.tag==tag)