async function fetchAndDisplayItems(category) {
    const url = `https://localhost:7035/api/MenuItem/category/${category}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.isSuccess) {
            displayMenuItems(data.result);
        } else {
            console.error(`Error fetching ${category} items:`, data.errorMessage);
        }
    } catch (error) {
        console.error(`Error fetching ${category} items:`, error);
    }
}

async function deleteMenuItem(menuItemID, category) {
    const url = `https://localhost:7035/api/MenuItem/delete/${menuItemID}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.isSuccess) {

            alert('Ürün başarıyla silindi!');
            fetchAndDisplayItems(category); // Refresh the item list

        } else {
            alert(`Ürün silme işleminde hata!: ${data.errorMessage}`);
        }
    } catch (error) {
        console.error(`Ürün silme işleminde hata!:`, error);
    }
}


async function updateMenuItem(menuItemID, property, newValue, category) {
    const url = `https://localhost:7035/api/MenuItem/${menuItemID}/${property}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // Sending newValue directly as the body, assuming it's a number or string
            body: JSON.stringify(newValue)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.isSuccess) {
            alert('Ürün başarıyla güncellendi!');
            fetchAndDisplayItems(category); // Refresh the item list based on the category
        } else {
            alert(`Ürün güncelleştirmede hata: ${data.errorMessage}`);
        }
    } catch (error) {
        console.error(`Ürün güncelleştirmede hata:`, error);
    }
}




function displayMenuItems(items) {
    const container = document.getElementById('item-container');
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-lg-6 mb-4';
        card.innerHTML = `
            <div class="card" >
                <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title" style="font-weight:bolder;">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text" style="font-weight:bolder;">${item.price} TL</p>

             <div class="d-flex justify-content-between">
                    <button class="btn  mb-2 flex-fill mx-1" style="background-color:#41553d;color:#efeee3;"  onclick="deleteMenuItem(${item.menuItemID}, '${item.category}')">Sil</button>
                        <button class="btn  mb-2 flex-fill mx-1" style="background-color:#41553d;color:#efeee3;" onclick="toggleUpdateFields(${item.menuItemID})">Güncelle</button>
            </div>

                    <!-- Hidden update fields -->
                    <div id="update-fields-${item.menuItemID}" style="display:none; margin-top: 10px;">
                        <input type="text" id="name-${item.menuItemID}" value="${item.name}" class="form-control mb-2" />
                        <button class="btn btn-primary mb-2" style="background-color:#41553d;color:#efeee3;" onclick="updateMenuItem(${item.menuItemID}, 'name', document.getElementById('name-${item.menuItemID}').value, '${item.category}')">İsmi Güncelle</button>
                        <br>
                        
                        <input type="number" step="0.01" id="price-${item.menuItemID}" value="${item.price}" class="form-control mb-2" />
                        <button class="btn btn-primary mb-2"  style="background-color:#41553d;color:#efeee3;" onclick="updateMenuItem(${item.menuItemID}, 'price', document.getElementById('price-${item.menuItemID}').value, '${item.category}')">Fiyatı Güncelle</button>
                        <br>
                        <input type="text" id="url-${item.menuItemID}" value="${item.imageUrl}" class="form-control mb-2" />
                        <button class="btn btn-primary mb-2" style="background-color:#41553d;color:#efeee3;" onclick="updateMenuItem(${item.menuItemID}, 'imageUrl', document.getElementById('image-${item.menuItemID}').value, '${item.category}')">Resmi Güncelle</button>
                        <br>
                        <input type="text" id="description-${item.menuItemID}" value="${item.description}" class="form-control mb-2" />
                        <button class="btn btn-primary mb-2" style="background-color:#41553d;color:#efeee3;" onclick="updateMenuItem(${item.menuItemID}, 'description', document.getElementById('description-${item.menuItemID}').value, '${item.category}')">Açıklamayı Güncelle</button>
                        <br>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}


function toggleUpdateFields(menuItemID) {
    const updateFields = document.getElementById(`update-fields-${menuItemID}`);
    if (updateFields.style.display === "none") {
        updateFields.style.display = "block";
    } else {
        updateFields.style.display = "none";
    }
}

