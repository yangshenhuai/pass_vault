# -*- coding: utf-8 -*-
from tinydb import TinyDB, Query
from constants import dbPath
from datetime import datetime

db = TinyDB(dbPath)


def getUserPasswords(mobile):
    query = Query()
    return db.search( (query.tag == 'passwordItem') & (query.mobile==mobile))

def getUserSecurityNotes(mobile) :
    query = Query()
    return db.search((query.tag == 'securityNotes') & (query.user == mobile))



def save(item):
    return db.insert(item.__dict__)


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

def updatePasswordItem(eid,pwd):
    db.update({'password':pwd ,'lastUpdateTime':datetime.now().strftime('%Y-%m-%d %H:%M:%S')},eids=[int(eid)])

def remove(tag) :
    query = Query()
    db.remove(query.tag==tag)

def removeWithIds(eid_array) :
    db.remove(eids=eid_array)