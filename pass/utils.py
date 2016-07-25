# -*- coding: utf-8 -*-
import hashlib
from cryptography.fernet import Fernet
from constants import fernet_secrept_key

def encrypt(message):
    return hashlib.md5(message.encode()).hexdigest()


def encryptPasswordItem(pwd):
    f = Fernet(fernet_secrept_key.encode('utf-8'))
    return f.encrypt(pwd.encode('utf-8')).decode('utf-8')



