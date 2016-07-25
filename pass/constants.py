# -*- coding: utf-8 -*-
import os

dbPath = os.getenv('TINY_DB_PATH', 'db.json')

session_secret_key = os.getenv('SESSION_SECRET_KEY', 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT')

fernet_secrept_key = os.getenv('FERNET_SECRET_KEY','-DxJ338_tUKD9qrpAvBIYn4p3H_M1KEOnpwVE6BMRHk=')
