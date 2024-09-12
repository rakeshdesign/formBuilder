var data = [];

function createData(field){
    switch (field) {
        case 'input':
            data.push({ id: Date.now(), fieldName: field, type: 'text', label: 'Input', placeholder:'Enter Text here...', value: '', required: false });
            break;
        case 'textarea':
            data.push({ id: Date.now(), fieldName : field , label: 'Textarea', placeholder:'Enter Text here...', value: '', required: false, rows: '4', resize: 'both' });
            break;
        case 'select':
            data.push({ id: Date.now(), fieldName : field , label: 'Select', selectedOptionIndex: 1, required: false, options : [{label:'label', value: 'value'}], multiple: false, optionCount:1 });
            break;
        case 'radio':
            data.push({ id: Date.now(), fieldName : field , label: 'Radio Group', selectedRadio: 1, radio : [{label:'label', value: 'value'},{label:'label 2', value: 'value 2'},{label:'label 3', value: 'value 3'}], radioCount:4 });
            break;
        case 'checkbox':
            data.push({ id: Date.now(), fieldName : field , label: 'Checkbox Group' , checkbox : [{label:'label', value: 'value'},{label:'label 2', value: 'value 2'},{label:'label 3', value: 'value 3'}], checkboxCount:4 });
            break;
        case 'button':
            data.push({ id: Date.now(), fieldName : field , label: 'Button' , type: 'submit', theme:'primary'});
            break;
    }
    createFields();
}

function getFieldData(id){
    return data.find(obj => obj.id === id);
}

function createFields(){
    $('#drop').html('');
    for(let i=0;i<data.length;i++){
        let field = getFieldData(data[i].id);
        let fieldHTML='';

        switch (field.fieldName) {
            case 'input':
                fieldHTML = 
                    `<div class="mb-3 border drop_field p-3" onclick="editField(${field.id})">
                        <label for="${field.id}" class="form-label">${field.label}</label>
                        <input type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} id="${field.id}" class="form-control" value="${field.value}">
                    </div>`;
                break;

            case 'textarea':
                fieldHTML = 
                    `<div class="mb-3 border drop_field p-3" onclick="editField(${field.id})">
                        <label for="${field.id}" class="form-label">${field.label}</label>
                        <textarea placeholder="${field.placeholder}" ${field.required ? 'required' : ''} id="${field.id}" class="form-control" rows="${field.rows}" style="resize:${field.resize};">${field.value}</textarea>
                    </div>`;
                break;

            case 'select':
                fieldHTML = 
                    `<div class="mb-3 border drop_field p-3" onclick="editField(${field.id})">
                        <label for="${field.id}" class="form-label">${field.label}</label>
                        <select class="form-select" ${field.multiple?"multiple":''} ${field.required?"required":''} id="${field.id}">`
                            for (let i = 0; i < field.options.length; i++) {
                                fieldHTML += `<option value="${field.options[i].value}" ${field.selectedOptionIndex === i+1 ? 'selected':''}>${field.options[i].label}</option>`
                            }
                        fieldHTML+= `</select>
                    </div>`;
                break;
            case 'radio':
                fieldHTML = 
                `<div class="mb-3 border drop_field p-3" onclick="editField(${field.id})">
                    ${field.label}`
                    for (let i = 0; i < field.radio.length; i++) {
                        fieldHTML += 
                        `<div class="form-check">
                            <input class="form-check-input" type="radio" id="radio_${field.id}_${i+1}" value="${field.radio[i].value}" name="radio_${field.id}" ${field.selectedRadio === i+1 ? 'checked':''}>
                            <label for="radio_${field.id}_${i+1}" class="form-check-label">${field.radio[i].label}</label>
                        </div>`
                    }
                fieldHTML+=`</div>`;
                break;
            case 'checkbox':
                fieldHTML = 
                `<div class="mb-3 border drop_field p-3" onclick="editField(${field.id})">
                    ${field.label}`
                    for (let i = 0; i < field.checkbox.length; i++) {
                        fieldHTML += 
                        `<div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkbox_${field.id}_${i+1}" value="${field.checkbox[i].value}" name="checkbox_${field.id}_${i+1}">
                            <label for="checkbox_${field.id}_${i+1}" class="form-check-label">${field.checkbox[i].label}</label>
                        </div>`
                    }
                fieldHTML+=`</div>`;
                break;
            case 'button':
                fieldHTML = `<button type="${field.type}" class="btn btn-${field.theme}" onclick="editField(${field.id})">${field.label}</button>`
                break;
        }
        $('#drop').append(fieldHTML);
    }
}

var editElementId=1;
function editField(id){
    if(editElementId===id) return;
    editElementId=id;

    let field = getFieldData(id);

    switch(field.fieldName){
        case 'input':
            $('#settings').html(`
                <div class="mb-3">
                    <label for="edit_label" class="form-label">Label:</label>
                    <input type="text" id="edit_label" class="form-control" value="${field.label}" oninput='updateData(${field.id}, "label", this.value)'>
                </div>
                <div class="mb-3">
                    <label for="edit_placeholder" class="form-label">Placeholder:</label>
                    <input type="text" id="edit_placeholder" class="form-control" value="${field.placeholder}" oninput='updateData(${field.id}, "placeholder", this.value)'>
                </div>
                <div class="mb-3">
                    <label for="edit_value" class="form-label">Default Value:</label>
                    <input type="text" id="edit_value" class="form-control" value="${field.value}" oninput='updateData(${field.id}, "value",  this.value)'>
                </div>
                <div class="mb-3 form-check">
                    <label for="edit_required" class="form-check-label">Required ?</label>
                    <input type="checkbox" id="edit_required" class="form-check-input" ${field.required ? 'checked' : ''} onchange='updateData(${field.id}, "required", this.checked)'>
                </div>
                <div class="mb-3">
                    <button class='btn btn-danger' onclick="removeField(${field.id})">Remove field</button>
                </div>
                `);            
            break;
        case 'textarea':
            $('#settings').html(`
                <div class="mb-3">
                    <label for="edit_label" class="form-label">Label:</label>
                    <input type="text" id="edit_label" class="form-control" value="${field.label}" oninput='updateData(${field.id}, "label", this.value)'>
                </div>
                <div class="mb-3">
                    <label for="edit_placeholder" class="form-label">Placeholder:</label>
                    <input type="text" id="edit_placeholder" class="form-control" value="${field.placeholder}" oninput='updateData(${field.id}, "placeholder", this.value)'>
                </div>
                <div class="mb-3">
                    <label for="edit_value" class="form-label">Default Value:</label>
                    <input type="text" id="edit_value" class="form-control" value="${field.value}" oninput='updateData(${field.id}, "value",  this.value)'>
                </div>
                <div class="mb-3 form-check">
                    <label for="edit_required" class="form-check-label">Required ?</label>
                    <input type="checkbox" id="edit_required" class="form-check-input" ${field.required ? 'checked' : ''} onchange='updateData(${field.id}, "required", this.checked)'>
                </div>
                <div class="mb-3">
                    <label for="edit_rows" class="form-label">rows:</label>
                    <input type="number" id="edit_rows" class="form-control" value="${field.rows}" oninput='updateData(${field.id}, "rows",  this.value)'>
                </div>
                <div class="mb-3">
                <label class="form-label">Resize:</label>
                    <select class="form-select" onchange='updateData(${field.id}, "resize", this.value)'>
                        <option ${field.resize === 'both' ? 'selected':''} value="both">both</option>
                        <option ${field.resize === 'horizontal' ? 'selected':''} value="horizontal">horizontal</option>
                        <option ${field.resize === 'verticle' ? 'selected':''} value="verticle">verticle</option>
                    </select>
                </div>
                <div class="mb-3">
                    <button class='btn btn-danger' onclick="removeField(${field.id})">Remove field</button>
                </div>
                `);            
            break;

            case 'select':
                let html = `
                    <div class="mb-3">
                        <label for="edit_label" class="form-label">Label:</label>
                        <input type="text" id="edit_label" class="form-control" value="${field.label}" oninput='updateData(${field.id}, "label", this.value)'>
                    </div>

                    <h5 class="h5">Option setting :</h5> 
                    <h6 class="h6 mt-2">choose default option</h6>

                    <div class="mb-3 container-fluid">`
                        for(let i=0;i<field.options.length;i++){
                            html+=
                            `<div class="mb-3 row align-items-center">
                                <input type="radio" class="col-1 form-check-input p-0" name="${field.id}" ${field.selectedOptionIndex===i+1? 'checked':''} onclick='updateData(${field.id}, "selectedOptionIndex", ${i+1})'>
                                <div class="col-5 mb-3">
                                    <label class="form-label">value:</label>
                                    <input type="text" class="form-control" placeholder="Enter Value here..." value="${field.options[i].value}" oninput='data.find(obj => obj.id === ${field.id}).options[${i}].value=this.value ,createFields();'>
                                </div>
                                <div class="col-5 mb-3">
                                    <label class="form-label">label:</label>
                                    <input type="text" class="form-control" placeholder="Enter label here..." value="${field.options[i].label}" oninput='data.find(obj => obj.id === ${field.id}).options[${i}].label=this.value, createFields();'>
                                </div>
                                <div class="col-1 mt-3 p-0">
                                    <button class="btn btn-danger" onclick="removeOption(${field.id}, ${i+1})">
                                        <i class="fas fa-close"></i>
                                    </button>
                                </div>
                            </div>`
                        }
                        html += 
                        `<div class="mb-3">
                            <button class='btn btn-dark' onclick="addOption(${field.id})">+ Add</button>
                        </div>
                    </div>

                    <div class="mb-3 form-check">
                        <label for="edit_required" class="form-check-label">Required ?</label>
                        <input type="checkbox" id="edit_required" class="form-check-input" ${field.required ? 'checked' : ''} onchange='updateData(${field.id}, "required", this.checked)'>
                    </div>

                    <div class="mb-3 form-check">
                        <label for="edit_multiple" class="form-check-label">Multiple select ?</label>
                        <input type="checkbox" id="edit_multiple" class="form-check-input" ${field.multiple ? 'checked' : ''} onchange='updateData(${field.id}, "multiple", this.checked)'>
                    </div>

                    <div class="mb-3">
                        <button class='btn btn-danger' onclick="removeField(${field.id})">Remove field</button>
                    </div>`;     
                    $('#settings').html(html);       
                break;

                case 'radio':
                    let html1 = `
                        <div class="mb-3">
                            <label for="edit_label" class="form-label">Label:</label>
                            <input type="text" id="edit_label" class="form-control" value="${field.label}" oninput='updateData(${field.id}, "label", this.value)'>
                        </div>
    
                        <h5 class="h5">Radio setting :</h5> 
                        <h6 class="h6 mt-2">choose default radio</h6>
    
                        <div class="mb-3 container-fluid">`
                            for(let i=0;i<field.radio.length;i++){
                                html1+=
                                `<div class="mb-3 row align-items-center">
                                    <input type="radio" class="col-1 form-check-input p-0" name="edit_radio_${field.id}" ${field.selectedRadio===i+1? 'checked':''} onclick='updateData(${field.id}, "selectedRadio", ${i+1})'>
                                    <div class="col-5 mb-3">
                                        <label class="form-label">value:</label>
                                        <input type="text" class="form-control" placeholder="Enter Value here..." value="${field.radio[i].value}" oninput='data.find(obj => obj.id === ${field.id}).radio[${i}].value=this.value ,createFields();'>
                                    </div>
                                    <div class="col-5 mb-3">
                                        <label class="form-label">label:</label>
                                        <input type="text" class="form-control" placeholder="Enter label here..." value="${field.radio[i].label}" oninput='data.find(obj => obj.id === ${field.id}).radio[${i}].label=this.value, createFields();'>
                                    </div>
                                    <div class="col-1 mt-3 p-0">
                                        <button class="btn btn-danger" onclick="removeRadio(${field.id}, ${i+1})">
                                            <i class="fas fa-close"></i>
                                        </button>
                                    </div>
                                </div>`
                            }
                            html1 += 
                            `<div class="mb-3">
                                <button class='btn btn-dark' onclick="addRadio(${field.id})">+ Add</button>
                            </div>
                        </div>
    
                        <div class="mb-3">
                            <button class='btn btn-danger' onclick="removeField(${field.id})">Remove field</button>
                        </div>`;            
                        $('#settings').html(html1);   
                    break;

                    case 'checkbox':
                    let html2 = `
                        <div class="mb-3">
                            <label for="edit_label" class="form-label">Label:</label>
                            <input type="text" id="edit_label" class="form-control" value="${field.label}" oninput='updateData(${field.id}, "label", this.value)'>
                        </div>
    
                        <h5 class="h5">Checkbox setting :</h5> 
    
                        <div class="mb-3 container-fluid">`
                            for(let i=0;i<field.checkbox.length;i++){
                                html2+=
                                `<div class="mb-3 row align-items-center">
                                    <div class="col-5 mb-3">
                                        <label class="form-label">value:</label>
                                        <input type="text" class="form-control" placeholder="Enter Value here..." value="${field.checkbox[i].value}" oninput='data.find(obj => obj.id === ${field.id}).checkbox[${i}].value=this.value ,createFields();'>
                                    </div>
                                    <div class="col-5 mb-3">
                                        <label class="form-label">label:</label>
                                        <input type="text" class="form-control" placeholder="Enter label here..." value="${field.checkbox[i].label}" oninput='data.find(obj => obj.id === ${field.id}).checkbox[${i}].label=this.value, createFields();'>
                                    </div>
                                    <div class="col-1 mt-3 p-0">
                                        <button class="btn btn-danger" onclick="removeCheckbox(${field.id}, ${i+1})">
                                            <i class="fas fa-close"></i>
                                        </button>
                                    </div>
                                </div>`
                            }
                            html2 += 
                            `<div class="mb-3">
                                <button class='btn btn-dark' onclick="addCheckbox(${field.id})">+ Add</button>
                            </div>
                        </div>
    
                        <div class="mb-3">
                            <button class='btn btn-danger' onclick="removeField(${field.id})">Remove field</button>
                        </div>`;            
                        $('#settings').html(html2);   
                    break;

                    case 'button':
                        $('#settings').html(`
                        <div class="mb-3">
                            <label for="edit_label" class="form-label">Label:</label>
                            <input type="text" id="edit_label" class="form-control" value="${field.label}" oninput='updateData(${field.id}, "label", this.value)'>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Type:</label>
                            <select class="form-select" onchange='updateData(${field.id}, "type", this.value)'>
                                <option ${field.type === 'submit' ? 'selected':''} value="submit">Submit</option>
                                <option ${field.type === 'reset' ? 'selected':''} value="reset">Reset</option>
                            </select>
                        </div>

                        <div class="container-fluid">
                            <div class="mb-3 row">
                                <label class="form-label col-12">Choose Theme: </label>
                                <button class="btn btn-primary col-3" onclick='updateData(${field.id}, "theme", "primary")'>primary</button>
                                <button class="btn btn-secondary col-3" onclick='updateData(${field.id}, "theme", "secondary")'>secondary</button>
                                <button class="btn btn-success col-3" onclick='updateData(${field.id}, "theme", "success")'>success</button>
                                <button class="btn btn-danger col-3" onclick='updateData(${field.id}, "theme", "danger")'>danger</button>
                                <button class="btn btn-warning col-3" onclick='updateData(${field.id}, "theme", "warning")'>warning</button>
                                <button class="btn btn-info col-3" onclick='updateData(${field.id}, "theme", "info")'>info</button>
                                <button class="btn btn-light col-3" onclick='updateData(${field.id}, "theme", "light")'>light</button>
                                <button class="btn btn-dark col-3" onclick='updateData(${field.id}, "theme", "dark")'>dark</button>
                            </div>
                        </div>
                        `);
                        break;
                    
    }
}

function updateData(id, editAttribute ,value){
    data.find(obj => obj.id === id)[editAttribute]=value;
    createFields();
}

function removeField(id){
    data = data.filter(obj => obj.id !== id);
    createFields();
    $('#settings').html('<h4 class="text-center">Select field to see field options!</h4>')
}

function addOption(id){
    data.find(obj => obj.id === id).options.push({label:'label ' + getFieldData(id).optionCount, value: 'value ' + getFieldData(id).optionCount});
    data.find(obj => obj.id === id).optionCount+=1;
    editElementId=1;
    createFields();
    editField(id);
}

function removeOption(id, index){
    let field=getFieldData(id);
    if(field.selectedOptionIndex===index){
        field.selectedOptionIndex=1;
    }else if(field.selectedOptionIndex>index){
        field.selectedOptionIndex--;
    }
    data.find(obj => obj.id === id).options.splice(index-1, 1);

    editElementId=1;
    createFields();
    editField(id);
}

function addRadio(id){
    data.find(obj => obj.id === id).radio.push({label:'label ' + getFieldData(id).radioCount, value: 'value ' + getFieldData(id).radioCount});
    data.find(obj => obj.id === id).radioCount+=1;
    editElementId=1;
    createFields();
    editField(id);
}

function removeRadio(id, index){
    let field=getFieldData(id);
    if(field.selectedRadio===index){
        field.selectedRadio=1;
    }else if(field.selectedRadio>index){
        field.selectedRadio--;
    }
    data.find(obj => obj.id === id).radio.splice(index-1, 1);

    editElementId=1;
    createFields();
    editField(id);
}

function removeCheckbox(id, index){
    data.find(obj => obj.id === id).checkbox.splice(index-1, 1);
    editElementId=1;
    createFields();
    editField(id);
}

function addCheckbox(id){
    data.find(obj => obj.id === id).checkbox.push({label:'label ' + getFieldData(id).checkboxCount, value: 'value ' + getFieldData(id).checkboxCount});
    data.find(obj => obj.id === id).checkboxCount+=1;
    editElementId=1;
    createFields();
    editField(id);
}