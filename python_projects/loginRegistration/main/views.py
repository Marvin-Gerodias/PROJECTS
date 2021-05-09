from django.shortcuts import render, redirect
from .models import User, Ticket
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
        return redirect ('/dashboard')

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
            return redirect('/dashboard')
    else:
        messages.error(request, "Login failed. Try again.")
    return redirect('/')

def newticket(request):
    user = User.objects.get(id = request.session['user_id'])
    context ={
        'user' : user,
    }
    return render(request, "newticket.html", context)

def newticketprocess(request):
    errors = Ticket.objects.newticket_validator(request.POST)
    if len(errors) > 0:
        for error in errors.values():
            messages.error(request, error)
        return redirect('/newticket')

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
        "myuser" : User.objects.get(id = request.session['user_id']),
        "tickets" :Ticket.objects.all(),
    }
    return render(request, "dashboard.html", context)