from django.shortcuts import render, redirect
from .models import User, Ticket, Chat
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

def ticket(request, id):
    ticket = Ticket.objects.get(id = id)
    user = User.objects.get(id = request.session['user_id'])

    context = {
        "ticket" : ticket,
        "myuser" : user,
        "chats" : Chat.objects.all().order_by('-id')
    }
    return render(request, 'ticket.html', context)

def commentprocess(request, id):
    # errors = Chat.objects.newchat_validator(request.POST)
    # if len(errors) > 0:
    #     for val in errors.values():
    #         messages.error(request, val)
    #     return redirect(f'/ticket/{id}')

    ticket = Ticket.objects.get(id = id)
    user = User.objects.get(id = request.session['user_id'])
    print(ticket)
    print(user)

    Chat.objects.create(
        chat_comment = request.POST['chat'],
        assigned_ticket = ticket,
        mentioned_by = user,
    )
    return redirect(f'/ticket/{id}')

def deletecomment(request, id):
    d = Chat.objects.get(id = id)
    ticket_id = d.assigned_ticket.id
    d.delete()
    return redirect(f'/ticket/{ticket_id}')

def newticket(request):
    user = User.objects.get(id = request.session['user_id'])
    context ={
        'user' : user,
    }
    print(user)
    return render(request, "newticket.html", context)

def newticketprocess(request):
    errors = Ticket.objects.newticket_validator(request.POST)
    print(errors)
    if len(errors) > 0:
        for val in errors.values():
            messages.error(request, val)
        return redirect('/newticket')

    user = User.objects.get(id = request.session['user_id'])
    print(user)
    Ticket.objects.create(
        status = request.POST['status'],
        issue_type = request.POST['issue_type'],
        comment = request.POST['comment'],
        priority_level = request.POST['priority_level'],
        assigned_to = user,
    )
    return redirect('/mytickets')

def editticket(request, id):
    user = User.objects.get(id = request.session['user_id'])
    ticket = Ticket.objects.get(id = id)
    context = {
        "ticket" : ticket,
        "myuser" : user
    }
    return render(request, 'editticket.html', context)

def editticketprocess(request, id):
    errors = Ticket.objects.editticket_validator(request.POST)
    if len(errors) > 0:
        for val in errors.values():
            messages.error(request, val)
        return redirect(f'/editticketprocess/{id}')

    new_ticket = Ticket.objects.get(id = id)
    new_ticket.status = request.POST['status']
    new_ticket.issue_type = request.POST['issue_type']
    new_ticket.comment = request.POST['comment']
    new_ticket.priority_level = request.POST['priority_level']
    new_ticket.save()
    return redirect('/mytickets')

def mytickets(request):
    tickets = Ticket.objects.all()
    context = {
        "myuser" : User.objects.get(id = request.session['user_id']),
        "tickets" : tickets
    }
    return render(request, 'mytickets.html', context)

def deleteticket(request, id):
    d = Ticket.objects.get(id = id)
    d.delete()
    return redirect('/dashboard')

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