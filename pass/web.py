# -*- coding: utf-8 -*-
from datetime import datetime

import flask_login
from flask import Flask,request, redirect , url_for
from flask import render_template
from flask import jsonify

import dao
import services
from constants import session_secret_key
from models import passwordItem
from models import user
from utils import encrypt
from utils import encryptPasswordItem
from utils import decrytPassword


app = Flask(__name__)
app.secret_key = session_secret_key
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

services.init_site()



@login_manager.user_loader
def user_loader(mobile):
    if mobile is None:
        return
    element = dao.getUserByMobile(mobile)
    if element is None :
        return
    dbUser = user(element['nickName'],element['masterPassword'],element['mobile'],element['email'],element['status'],element['createTime'])
    dbUser.id = mobile
    return dbUser

# @login_manager.request_loader
# def request_loader(request):
#     mobile = request.form.get('mobile')
#     user = dao.getUserByMobile(mobile)
#     if user is None:
#         return
#     user.id = mobile
#     user.is_authenticated = encrypt(request.form['masterPassword']) == user.masterPassword
#     return user

@login_manager.unauthorized_handler
def unauthorized_handler():
    return render_template('index.html',showLogin=True)


@app.route("/login",methods=['POST'])
def login():
    mobile =request.form['mobile']
    element = dao.getUserByMobile(mobile)
    if element is None or encrypt(request.form['masterPassword']) != element['masterPassword'] :
        return 'Bad login'
    current_user = user(element['nickName'], element['masterPassword'], element['mobile'], element['email'], element['status'],
         element['createTime'])
    current_user.id=mobile
    flask_login.login_user(current_user)
    return redirect('/')

@app.route("/logout")
@flask_login.login_required
def logout():
    flask_login.logout_user()
    return redirect('/')


@app.route("/")
@flask_login.login_required
def index():
    current_user = flask_login.current_user
    passwordItems = dao.getAllPasswordItem(current_user.__dict__['mobile'])
    for passwordItem in passwordItems:
        siteElem = dao.getSiteByName(passwordItem['websiteName'])
        if siteElem is not None:
            passwordItem['logo'] = siteElem['site_log']
        else :
            passwordItem['logo'] = 'fa-check-circle' # default
    return render_template('index.html', passwordItems=passwordItems)


@app.route("/password/new",methods=['GET','POST'])
@flask_login.login_required
def newPassword():
    if request.method == 'POST':
        dao.save(passwordItem(request.form['websiteName'],request.form['websiteLoginUrl'],request.form['userName'],encryptPasswordItem(request.form['password']),
                              datetime.now().strftime('%Y-%m-%d %H:%M:%S'),datetime.now().strftime('%Y-%m-%d %H:%M:%S'),request.form['securityLevel'],flask_login.current_user.__dict__['mobile']))

        return redirect('/')
    else:
        return render_template('new_password.html',sites =  dao.getAllSiteConfigs())

@app.route("/register",methods=["POST"])
def register():
    mobile = request.form['mobile']
    if(dao.containsUser(mobile)):
        return 'BAD REQUEST'
    nickName = request.form['nickName']
    masterPassword=request.form['masterPassword']
    newUser = user(nickName,encrypt(masterPassword),mobile,'',True,datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    dao.save(newUser)
    newUser.id=mobile
    flask_login.login_user(newUser)
    return redirect('/')

@app.route("/password/<id>")
def passwordItem(id):
    element = dao.getById(id)
    token = element['password']
    element['password'] = decrytPassword(token)
    return jsonify(**element)


if __name__ == "__main__":
    app.run()
