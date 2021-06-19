
let currentPage = 1;
let limit = 20;
let offset = 0;
let nbElements;


$("#updateBtn").hide();
function showpaginatedusers() {
    $("#tab > tbody").empty();
    refreshForm()
    fetch(`http://localhost:3000/users?offset=${offset}&limit=${limit}`).then(response => {
        if (!response.ok) {
            throw Error("ERROR on getting users")
        }
        return response.json()
    })
        .then(data => {
            //console.log(data.rows)
            nbElements = data.count

            usersdata = GetPaginatedData(data, currentPage, limit)
            usersdata.users.forEach(element => {
                createrow(element.id, element.username, element.email, element.password, element.role).appendTo("#usesData")
            });
        })
        .catch(err => {
            console.log(err)
        })
}


function GetPaginatedData(data, currentPage, limit) {
    const { count: totalitems, rows: users } = data
    currentPage = currentPage;
    totalpages = Math.ceil(totalitems / limit)
    return { totalitems, users, totalpages, currentPage }
}

const createrow = (id, username, email, password, role) => {
    return $("<tr/>").append(`<td>${id}</td><td>${username}</td><td>${email}</td><td>${role}</td>`)
        .append($("<td/>").append($("<button/>").addClass("btn btn-outline-success").append($("<span/>").addClass("fa fa-pencil"))
            .click(() => { intiEdit(id, username, email, password, role) }))
            .append($("<button/>").addClass("btn btn-outline-danger").append($("<span/>").addClass("fa fa-trash")).click(() => {
                deleteUser(id)
            })))
}

function intiEdit(id, username, email, password, role) {
    $("#userId").val(id);
    $("#username").val(username);
    $("#email").val(email);
    $("#pwd").val(password);
    $("#role option")
        .removeAttr('selected')
        .filter(`[value=${role}]`)
        .attr('selected', true)
    $("#addBtn").hide()
    $("#updateBtn").show()
    $("#formTitle").text("Update User")

}


function updateUser(event) {
    event.preventDefault()
    clearMsgs()
    const user = formData()
    const id = parseInt($("#userId").val())
    Object.assign(user, { id: id })
    fetch('http://localhost:3000/users', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
        .then(handleErrors)
        .then(() => {
            refreshForm()
            showpaginatedusers()
            showMsg(`l'utilisateur avec l'id ${id} est modifié avec success`, "success")
        })
}



function formData() {
    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#pwd").val();
    const role = $("#role").val()
    return { username, email, password, role }
}

function refreshForm() {
    $("#userId").val("");
    $("#username").val("");
    $("#email").val("");
    $("#pwd").val("");
    $('#role option')
        .removeAttr('selected')
        .filter(`[value=admin]`)
        .attr('selected', true)
    $("#addBtn").show()
    $("#updateBtn").hide()
    $("#formTitle").text("Ajouter un utilisateur")
}

function showMsg(msg, status) {
    $("#pageCard").append($("<div>").addClass(`alert alert-${status} m-3`).text(msg))
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(response.body);
        response.text().then(err => {
            showMsg(JSON.parse(err).message, "danger")
        })
    }
    return response.json()
}


function clearMsgs() {
    $("#pageCard").html("")
}

function deleteUser(id) {
    clearMsgs()
    fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
        .then(handleErrors)
        .then(() => {
            $("#tab > tbody").empty();
            showpaginatedusers()
            showMsg(`User with id = ${id} deleted successfully!`, "danger")
        })
}

function addUser(event) {
    event.preventDefault()
    clearMsgs()
    const user = formData()
    fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
    }).then(() => {
        showMsg(`l'utilisateur ${user.username} a été créé avec success`, "success")
        refreshForm()
        showpaginatedusers()
    })
        .catch(err => {
            console.log(err)
        })

}
function showNextPaginatedUsers() {
    if ((currentPage) * limit < nbElements) {
        currentPage++
        showpaginatedusers()
    }
}

function showPrevPaginatedUsers() {
    if ((currentPage) > 1) {
        currentPage--
        showpaginatedusers()
    }
}