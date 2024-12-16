var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var bookMarks = []
var regex = {
    siteName: {
        value: /^[A-Za-z_\.]{4,}$/,
        isValid: false
    },
    siteUrl: {
        value: /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/,
        isValid: false
    }
}

if (localStorage.getItem("bookMarks") != null) {
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displayBookMark();
}


function addBookmark() {
    var bookMark = {
        name: siteName.value,
        url: siteUrl.value
    }
    bookMarks.push(bookMark);
    displayBookMark();
    clearForm()
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
}


function clearForm() {
    siteName.value = null;
    siteUrl.value = null;
    submitBtn.disabled = true
}


function displayBookMark() {
    var cartona = ``
    for (var i = 0; i < bookMarks.length; i++) {
        cartona += `                <tr>
                    <td>${i + 1}</td>
                    <td>${bookMarks[i].name}</td>
                    <td>
                    <a href="${bookMarks[i].url}" target="_blank">
                            <button class="btn btn-primary">
                            <i class="fa-solid fa-eye"></i>
                            Visit
                        </button>
                    </a>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteBookmark(${i})">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                        </button>
                    </td>
                </tr>`
    }
    document.getElementById("myTable").innerHTML = cartona;
}


function deleteBookmark(index) {
    bookMarks.splice(index, 1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displayBookMark();
}

function validatInputs(element) {
    if (regex[element.id].value.test(element.value) == true) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isValid = true
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        regex[element.id].isValid = false
    }
    toggleAddBtn()
}

function toggleAddBtn() {
    if (regex.siteName.isValid && regex.siteUrl.isValid == true) {
        submitBtn.disabled = false
    } else {
        submitBtn.disabled = true
    }
}