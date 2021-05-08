from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages
import bcrypt


def root(request):
    context = {
        "users": User.objects.all()
    }
    return render(request, 'login.html', context)

def reg_process(request):
    errors = User.objects.reg_validator(request.POST)
    if len(errors) > 0:
        for val in errors.values():
            messages.error(request, val)
        return redirect('/')
        
    else:
        password = request.POST["password"]
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        newuser = User.objects.create(
            fname = request.POST["fname"],
            lname = request.POST["lname"],
            email = request.POST["email"],
            password = hashed,
        )
        request.session['user_id'] = newuser.id
        return redirect ('/success')

def login(request):
    errors = User.objects.login_validator(request.POST)
    if len(errors) > 0:
        for val in errors.values():
            messages.error(request, val)
        return redirect('/')

    user = User.objects.filter(email=request.POST['email']) 
    if user: 
        logged_user = user[0] 
        if bcrypt.checkpw(request.POST["password"].encode(), logged_user.password.encode()):
            request.session['user_id'] = logged_user.id
            return redirect('/success')
    else:
        messages.error(request, "Login failed. Try again.")
    return redirect('/')


    
def logout(request):
    request.session.flush()
    return redirect('/')

def delete(request, id):
    d = User.objects.get(id = id)
    d.delete()
    return redirect('/')

#Change the render to redirect to the second app
#Don't forget to copy and paste the 'context' over to the other views.py

def success(request):
    context = {
        "myuser" : User.objects.get(id = request.session['user_id'])
    }
    return render(request, "success.html", context)