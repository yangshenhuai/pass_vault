# -*- coding: utf-8 -*-

from models import site
from dao import containsSiteConfig
from dao import save
from dao import remove



global_site = [site('Google','http://google.com/','fa-google'),site('facebook','http://facebook.com','fa-facebook-official'),site('twitter','http://twitter.com','fa-twitter')]

def init_site() :
    # remove('site_config')
    for each_site in global_site:
        if not containsSiteConfig(each_site.site_name) :
            save(each_site)


