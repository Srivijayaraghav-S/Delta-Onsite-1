window.onload = function () {
    let close = document.getElementById('close');
    let addLabels = document.getElementById('addLabels');
    let bg = document.getElementById("bg");
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let labelTagList = localStorage.getItem('labelsListTags') ? JSON.parse(localStorage.getItem('labelsListTags')) : [];
    console.log(labelTagList);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    localStorage.setItem('labelsListTags', JSON.stringify(labelTagList));
    let data = JSON.parse(localStorage.getItem('items'));
    let labelTags = JSON.parse(localStorage.getItem('labelsListTags'));
    console.log(data);
    console.log(labelTags);
    let tagLabels = document.getElementById('labels');
    tagLabels.setAttribute('id', 'labels');
    for (let j = 0; j < labelTags.length; j++) {
        let newTagLabel = document.createElement('option');
        newTagLabel.innerHTML = labelTags[j];
        tagLabels.appendChild(newTagLabel);
    }
    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            element = data[i];
            let unorderedList = document.getElementById("list");
            let listItem = document.createElement("li");
            let textData = document.createElement("div");
            let titleData = document.createElement("h3");
            let label = document.createElement("label");
            titleData.innerHTML = element.title;
            textData.textContent = element.text;
            label.textContent = element.label;
            listItem.appendChild(titleData);
            listItem.appendChild(textData);
            label.style.backgroundColor = "gray";
            label.style.color = "white";
            listItem.appendChild(label);
            listItem.style.backgroundColor = element.color;
            console.log(listItem);
            unorderedList.appendChild(listItem);
        }
    };
    function Note(title, text, color, label) {
        this.title = title;
        this.text = text;
        this.color = color;
        this.label = label;
    }
    addLabels.addEventListener('click', () => {
        let newTag = prompt("Enter label");
        let tagsNewList = localStorage.getItem('labelsListTags') ? JSON.parse(localStorage.getItem('labelsListTags')) : [];
        let newTagElement = document.createElement("option");
        newTagElement.value = newTag;
        newTagElement.text = newTag;
        let tagsList = document.getElementById("labels");
        tagsList.appendChild(newTagElement);
        tagsNewList.push(newTag);
        localStorage.setItem('labelsListTags', JSON.stringify(tagsNewList));
    });
    close.addEventListener("click", () => {
        let title = document.querySelector('input');
        let text = document.querySelector("textarea");
        let textDiv = document.getElementById("textDiv");
        let labelsList = document.getElementById("labels");
        console.log(title.value);
        console.log(text.value);
        console.log(bg.value);
        let ul = document.querySelector("ul");
        let newNote = document.createElement('li');
        let data = document.createElement("div");
        let heading = document.createElement("h3");
        heading.innerHTML = title.value;
        data.textContent = text.value;
        data.setAttribute("width", "150px");
        data.setAttribute("height", "150px");
        newNote.appendChild(heading);
        newNote.appendChild(data);
        let bgColor = bg.options[bg.selectedIndex].value;
        let selectedLabel = labelsList.options[labelsList.selectedIndex].value;
        console.log(selectedLabel);
        let selectedLabelElement = document.createElement("label");
        selectedLabelElement.value = selectedLabel;
        selectedLabelElement.text = selectedLabel;
        selectedLabelElement.style.backgroundColor = "gray";
        selectedLabelElement.classList.add("selectedLabel");
        newNote.style.backgroundColor = bgColor;
        newNote.appendChild(selectedLabelElement);
        var brandNewNote = new Note(title.value, text.value, bgColor, selectedLabel);
        ul.appendChild(newNote);
        itemsArray.push(brandNewNote);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        console.log("Yes");
        title.value = "";
        text.value = "";
        bg.selectedIndex = 2;
        text.remove();
        textNew = document.createElement("textarea");
        textNew.setAttribute("id", "text");
        textNew.setAttribute("placeholder", "Text");
        textDiv.appendChild(textNew);
    });
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
    }
    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }
};