document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const notesList = document.getElementById('notesList');
    let savedNotes = JSON.parse(localStorage.getItem('portfolio_notes')) || [];
    function displayNotes() {
        notesList.innerHTML = '';
        
        if (savedNotes.length === 0) {
            notesList.innerHTML = `<li style="color: #64748b; border: none; background: transparent; padding: 0;">No active notes found in Local Storage memory logs.</li>`;
            return;
        }

        savedNotes.forEach((note, index) => {
            const li = document.createElement('li');
            
            const textSpan = document.createElement('span');
            textSpan.textContent = note;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Remove";
            deleteBtn.className = "note-delete-btn";
            deleteBtn.addEventListener('click', () => deleteNote(index));
            
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }
    function saveNote() {
        const textValue = noteInput.value.trim();
        if (textValue === '') return;

        savedNotes.push(textValue);
        localStorage.setItem('portfolio_notes', JSON.stringify(savedNotes));
        
        noteInput.value = '';
        displayNotes();
    }
    function deleteNote(targetIndex) {
        savedNotes.splice(targetIndex, 1);
        localStorage.setItem('portfolio_notes', JSON.stringify(savedNotes));
        displayNotes();
    }

    saveNoteBtn.addEventListener('click', saveNote);
    const productsMockData = [
        { id: 1, name: "Studio Reference Headphones", category: "Electronics", price: 149.99, rating: 4.8 },
        { id: 2, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 89.50, rating: 4.5 },
        { id: 3, name: "Waterproof Travel Pack", category: "Apparel", price: 65.00, rating: 4.2 },
        { id: 4, name: "Ergonomic Desk Task Chair", category: "Office", price: 245.00, rating: 4.6 },
        { id: 5, name: "Anodized Aluminum Fountain Pen", category: "Office", price: 34.00, rating: 4.9 },
        { id: 6, name: "All-Weather Lightweight Jacket", category: "Apparel", price: 120.00, rating: 4.0 }
    ];

    const filterCategory = document.getElementById('filterCategory');
    const sortCriteria = document.getElementById('sortCriteria');
    const productsGrid = document.getElementById('productsGrid');

    function renderProducts(productsArray) {
        productsGrid.innerHTML = '';

        if (productsArray.length === 0) {
            productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No products match selected search parameters.</p>`;
            return;
        }

        productsArray.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            
            productElement.innerHTML = `
                <span class="category-tag">${product.category}</span>
                <h4>${product.name}</h4>
                <div class="rating">★ ${product.rating.toFixed(1)}</div>
                <div class="price">$${product.price.toFixed(2)}</div>
            `;
            productsGrid.appendChild(productElement);
        });
    }
    function computeCatalogTransformation() {
        let transformedData = [...productsMockData];
        const selectedCategory = filterCategory.value;
        if (selectedCategory !== 'all') {
            transformedData = transformedData.filter(item => item.category === selectedCategory);
        }

        const selectedSort = sortCriteria.value;
        if (selectedSort === 'price-low') {
            transformedData.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'price-high') {
            transformedData.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'rating') {
            transformedData.sort((a, b) => b.rating - a.rating);
        }

        renderProducts(transformedData);
    }

    filterCategory.addEventListener('change', computeCatalogTransformation);
    sortCriteria.addEventListener('change', computeCatalogTransformation);
    displayNotes();                  
    renderProducts(productsMockData); 
});