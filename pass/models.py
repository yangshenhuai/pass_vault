# -*- coding: utf-8 -*-
import flask_login


class passwordItem(object):
    def __init__(self, websiteName, websiteLoginUrl, userName, password, createTime,
                 lastUpdateTime, securityLevel, mobile):
        self.lastUpdateTime = lastUpdateTime
        self.createTime = createTime
        self.password = password
        self.userName = userName
        self.websiteLoginUrl = websiteLoginUrl
        self.securityLevel = securityLevel
        self.websiteName = websiteName
        self.mobile = mobile
        self.tag = 'passwordItem'


class user(flask_login.UserMixin):
    def __init__(self, nickName, masterPassword, mobile, email, status, createTime):
        self.nickName = nickName
        self.masterPassword = masterPassword
        self.mobile = mobile
        self.email = email
        self.status = status
        self.createTime = createTime
        self.tag = 'user'


class site(object):
    def __init__(self, site_name, site_login_url, site_logo):
        self.site_name = site_name
        self.site_login_url = site_login_url
        self.site_log = site_logo
        self.tag = 'site_config'


class securityNotes(object):
    def __init__(self, title, detail,user,createTime,lastUpdateTime):
        self.title = title
        self.detail = detail
        self.user = user
        self.createTime=createTime
        self.lastUpdateTime=lastUpdateTime
        self.tag = 'securityNotes'
